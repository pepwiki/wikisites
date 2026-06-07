{
  description = "Wikisites — Reproducible development environment for encyclopeptide.com and wikipept.com";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-utils, flake-compat }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Node.js 20 LTS — pinned for reproducibility across all environments
        nodejs = pkgs.nodejs_20;

        # pnpm 9.x — strict dependency resolution, content-addressable storage
        pnpm = nodejs.pkgs.pnpm;

        # TypeScript 5.x — strict mode, no-any enforcement, path aliases
        typescript = pkgs.typescript_5;

        # Wrangler v3 — Cloudflare Workers/Pages CLI for local dev and deployment
        wrangler = pkgs.nodePackages.wrangler or (pkgs.stdenv.mkDerivation {
          pname = "wrangler";
          version = "3.57.0";
          src = pkgs.fetchurl {
            url = "https://registry.npmjs.org/wrangler/-/wrangler-3.57.0.tgz";
            sha256 = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
          };
          buildInputs = [ nodejs ];
          buildPhase = "npm install --production";
          installPhase = ''
            mkdir -p $out/lib/node_modules/wrangler
            cp -r node_modules/* $out/lib/node_modules/wrangler/
            mkdir -p $out/bin
            ln -s $out/lib/node_modules/wrangler/bin/wrangler.js $out/bin/wrangler
          '';
        });

        # Lean4 — optional formal proof assistant for mathematical verification
        lean4 = pkgs.lean4 or (pkgs.lean4 or pkgs.lean);

        # Standard development tools
        devTools = with pkgs; [
          git
          curl
          wget
          jq
          yq-go
          ripgrep
          fd
          tree
          htop
          openssh
          gnupg
        ];

        # Corepack — manages pnpm version automatically
        corepack = pkgs.corepack;

        # Python — required by some native Node.js dependencies (sharp, etc.)
        python3 = pkgs.python3;

        # Build dependencies for native modules
        buildTools = with pkgs; [
          gcc
          gnumake
          pkg-config
          vips  # required by sharp for image processing
        ];

      in
      {
        devShells.default = pkgs.mkShell {
          name = "wikisites-dev";

          # All packages available in the shell
          buildInputs = [
            nodejs
            pnpm
            typescript
            corepack
            python3
          ] ++ devTools ++ buildTools;

          # Environment variables
          shellHook = ''
            # ─────────────────────────────────────────────────────────────
            # Wikisites Development Environment
            # encyclopeptide.com + wikipept.com
            # Astro + SolidJS on Cloudflare
            # ─────────────────────────────────────────────────────────────

            echo ""
            echo "╔══════════════════════════════════════════════════════════════╗"
            echo "║  Wikisites Development Environment                         ║"
            echo "║  encyclopeptide.com + wikipept.com                         ║"
            echo "║  Astro + SolidJS on Cloudflare                             ║"
            echo "╚══════════════════════════════════════════════════════════════╝"
            echo ""

            # Enforce Node.js version consistency
            export NODE_VERSION="$(node --version)"
            echo "Node.js:      $NODE_VERSION"

            # Activate corepack so pnpm version is managed by package.json
            corepack enable
            echo "pnpm:         $(pnpm --version 2>/dev/null || echo 'activate via: corepack prepare pnpm@9.x --activate')"

            # TypeScript version
            echo "TypeScript:   ${typescript.version}"

            # Wrangler availability
            if command -v wrangler &>/dev/null; then
              echo "Wrangler:     $(wrangler --version 2>/dev/null | head -1)"
            else
              echo "Wrangler:     not in PATH (install via: pnpm add -D wrangler)"
            fi

            echo ""

            # ─── Project Root Detection ────────────────────────────────
            # Ensure we are in the wikisites repository root
            if [ ! -f "VERSION.md" ]; then
              echo "⚠  Warning: VERSION.md not found. You may not be in the wikisites root."
            fi

            # ─── Node Module Setup ─────────────────────────────────────
            if [ ! -d "node_modules" ]; then
              echo "→ node_modules not found. Run 'pnpm install' to install dependencies."
            else
              echo "✓ node_modules present ($(ls node_modules | wc -l) packages)"
            fi

            # ─── Environment Validation ────────────────────────────────
            # Validate that critical tools are available
            missing=()
            for tool in node pnpm git curl jq; do
              if ! command -v "$tool" &>/dev/null; then
                missing+=("$tool")
              fi
            done

            if [ \${#missing[@]} -gt 0 ]; then
              echo "⚠  Missing tools: \${missing[*]}"
              echo "  Install them or re-enter the nix develop shell."
            else
              echo "✓ All critical tools available"
            fi

            # ─── Cloudflare Configuration ──────────────────────────────
            if [ -n "''${CLOUDFLARE_API_TOKEN:-}" ]; then
              echo "✓ CLOUDFLARE_API_TOKEN is set"
            else
              echo "⚠  CLOUDFLARE_API_TOKEN not set. Cloudflare deployments will fail."
              echo "  Set it: export CLOUDFLARE_API_TOKEN=your_token_here"
            fi

            echo ""
            echo "Quick start:  pnpm install && pnpm dev"
            echo "Build:        pnpm build"
            echo "Test:         pnpm test"
            echo "Deploy:       pnpm deploy"
            echo ""
          '';

          # Strict dependency resolution
          shellHookExtra = ''
            export npm_config_strict=true
            export npm_config_engine_strict=true
          '';
        };

        # Production shell — minimal dependencies for CI/CD and builds
        devShells.ci = pkgs.mkShell {
          name = "wikisites-ci";

          buildInputs = [
            nodejs
            pnpm
            typescript
            corepack
            python3
          ] ++ buildTools;

          shellHook = ''
            echo "Wikisites CI Environment"
            corepack enable
            export CI=true
            export NODE_ENV=production
          '';
        };

        # Docker build shell — for building the Docker image locally
        devShells.docker = pkgs.mkShell {
          name = "wikisites-docker";

          buildInputs = [
            pkgs.docker
            pkgs.docker-compose
            nodejs
            pnpm
          ];

          shellHook = ''
            echo "Wikisites Docker Build Environment"
            echo "Build:  docker build -t wikisites ."
            echo "Run:    docker run -p 3000:3000 wikisites"
          '';
        };

        # Legacy compatibility — allows `nix-shell` without `--argstr attr devShells`
        packages = { };

        # Default package points to the dev shell
        packages.default = self.devShells.${system}.default;
      }
    );
}
