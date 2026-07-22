# Email Newsletter Template

## Subject Line Templates

### Tool Updates
- "New Feature: [Tool Name] Now Supports [Feature]"
- "[Tool Name] Just Got Better — See What's New"
- "You Asked, We Built It: [Feature Name] is Here"
- "Quick Tip: Master [Tool Name] in 60 Seconds"

### Research & News
- "This Week in Peptide Science: [Headline]"
- "[Number] Peptide Papers You Shouldn't Miss"
- "Breaking: [Regulatory/Market Update]"
- "[Month] Peptide Research Roundup"

### Educational Content
- "How to [Task]: A Step-by-Step Guide"
- "Common Mistakes in [Topic] (And How to Avoid Them)"
- "Peptide Science 101: [Concept Explained]"
- "[Expert Name] Explains [Topic]"

### Community
- "Meet the Contributor: [Name]"
- "[Number] Researchers Are Using PepWiki — Thank You!"
- "Your Feedback, Our Updates: [Month] Edition"
- "What's Next for PepWiki: Roadmap Preview"

---

## Header Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PepWiki Newsletter</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;">
    <tr>
      <td align="center" style="padding:20px 0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0066CC 0%, #004499 100%); padding:30px 40px;text-align:center;">
              <img src="https://pepwiki.org/logo-white.png" alt="PepWiki" width="150" style="display:block;margin:0 auto 15px;">
              <h1 style="color:#ffffff;font-size:24px;margin:0;font-weight:600;">PepWiki Newsletter</h1>
              <p style="color:#b3d4ff;font-size:14px;margin:8px 0 0;">Open-Source Peptide Science Tools</p>
            </td>
          </tr>
          
          <!-- Content continues below -->
```

---

## Content Sections

### Section 1: Featured Tool Update

```html
<!-- Featured Tool Update -->
<tr>
  <td style="padding:30px 40px;">
    <h2 style="color:#333333;font-size:18px;margin:0 0 15px;border-bottom:2px solid #0066CC;padding-bottom:10px;">
      🔧 Tool Update
    </h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:15px;background-color:#f8f9fa;border-radius:6px;border-left:4px solid #0066CC;">
          <h3 style="color:#0066CC;font-size:16px;margin:0 0 8px;">[Tool Name] — New Feature</h3>
          <p style="color:#555555;font-size:14px;margin:0 0 15px;line-height:1.6;">
            [Description of the new feature, what it does, and why it matters for researchers. 
            Keep it concise — 2-3 sentences max.]
          </p>
          <a href="https://pepwiki.org/[tool-url]" style="display:inline-block;background-color:#0066CC;color:#ffffff;padding:10px 20px;border-radius:4px;text-decoration:none;font-size:14px;font-weight:600;">
            Try It Now →
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

### Section 2: New Articles & Guides

```html
<!-- New Articles & Guides -->
<tr>
  <td style="padding:0 40px 30px;">
    <h2 style="color:#333333;font-size:18px;margin:0 0 15px;border-bottom:2px solid #FF6B00;padding-bottom:10px;">
      📚 New Articles & Guides
    </h2>
    
    <!-- Article 1 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:15px;">
      <tr>
        <td style="padding:15px;background-color:#fff8f0;border-radius:6px;">
          <h3 style="color:#333333;font-size:15px;margin:0 0 5px;">
            <a href="https://pepwiki.org/blog/[article-slug]" style="color:#0066CC;text-decoration:none;">[Article Title]</a>
          </h3>
          <p style="color:#666666;font-size:13px;margin:0;">[Brief description — 1-2 sentences]</p>
        </td>
      </tr>
    </table>
    
    <!-- Article 2 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:15px;">
      <tr>
        <td style="padding:15px;background-color:#fff8f0;border-radius:6px;">
          <h3 style="color:#333333;font-size:15px;margin:0 0 5px;">
            <a href="https://pepwiki.org/blog/[article-slug]" style="color:#0066CC;text-decoration:none;">[Article Title]</a>
          </h3>
          <p style="color:#666666;font-size:13px;margin:0;">[Brief description — 1-2 sentences]</p>
        </td>
      </tr>
    </table>
    
    <!-- Article 3 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:15px;background-color:#fff8f0;border-radius:6px;">
          <h3 style="color:#333333;font-size:15px;margin:0 0 5px;">
            <a href="https://pepwiki.org/blog/[article-slug]" style="color:#0066CC;text-decoration:none;">[Article Title]</a>
          </h3>
          <p style="color:#666666;font-size:13px;margin:0;">[Brief description — 1-2 sentences]</p>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

### Section 3: Industry News

```html
<!-- Industry News -->
<tr>
  <td style="padding:0 40px 30px;">
    <h2 style="color:#333333;font-size:18px;margin:0 0 15px;border-bottom:2px solid #28a745;padding-bottom:10px;">
      📰 Industry News
    </h2>
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
          <p style="color:#333333;font-size:14px;margin:0;">
            <span style="color:#28a745;font-weight:600;">[Category]</span> — 
            <a href="[news-url]" style="color:#0066CC;text-decoration:none;">[Headline]</a>
          </p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
          <p style="color:#333333;font-size:14px;margin:0;">
            <span style="color:#28a745;font-weight:600;">[Category]</span> — 
            <a href="[news-url]" style="color:#0066CC;text-decoration:none;">[Headline]</a>
          </p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:10px 0;">
          <p style="color:#333333;font-size:14px;margin:0;">
            <span style="color:#28a745;font-weight:600;">[Category]</span> — 
            <a href="[news-url]" style="color:#0066CC;text-decoration:none;">[Headline]</a>
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

### Section 4: Quick Tips

```html
<!-- Quick Tips -->
<tr>
  <td style="padding:0 40px 30px;">
    <h2 style="color:#333333;font-size:18px;margin:0 0 15px;border-bottom:2px solid #6f42c1;padding-bottom:10px;">
      💡 Quick Tips
    </h2>
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f5ff;border-radius:6px;padding:20px;">
      <tr>
        <td style="padding:15px;">
          <p style="color:#333333;font-size:14px;margin:0 0 10px;line-height:1.6;">
            <strong>Tip #1:</strong> [Useful tip about peptide science or tool usage]
          </p>
          <p style="color:#333333;font-size:14px;margin:0 0 10px;line-height:1.6;">
            <strong>Tip #2:</strong> [Another useful tip]
          </p>
          <p style="color:#333333;font-size:14px;margin:0;line-height:1.6;">
            <strong>Tip #3:</strong> [One more useful tip]
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

### Section 5: Community Spotlight

```html
<!-- Community Spotlight -->
<tr>
  <td style="padding:0 40px 30px;">
    <h2 style="color:#333333;font-size:18px;margin:0 0 15px;border-bottom:2px solid #e83e8c;padding-bottom:10px;">
      👥 Community Spotlight
    </h2>
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff5f8;border-radius:6px;">
      <tr>
        <td style="padding:20px;">
          <p style="color:#333333;font-size:14px;margin:0 0 10px;line-height:1.6;">
            " [Quote from community member about PepWiki or peptide science] "
          </p>
          <p style="color:#e83e8c;font-size:13px;margin:0;font-weight:600;">
            — [Name], [Title/Affiliation]
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

---

## CTA Buttons

### Primary CTA (Blue)
```html
<a href="https://pepwiki.org" style="display:inline-block;background-color:#0066CC;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:16px;font-weight:600;margin:5px;">
  Explore PepWiki →
</a>
```

### Secondary CTA (Orange)
```html
<a href="https://github.com/pepwiki" style="display:inline-block;background-color:#FF6B00;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:16px;font-weight:600;margin:5px;">
  View on GitHub
</a>
```

### Ghost CTA (Outline)
```html
<a href="https://pepwiki.org/tools" style="display:inline-block;border:2px solid #0066CC;color:#0066CC;padding:10px 22px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;margin:5px;">
  Browse All Tools
</a>
```

---

## Footer Template

```html
          <!-- Footer -->
          <tr>
            <td style="background-color:#2c3e50;padding:30px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <img src="https://pepwiki.org/logo-white.png" alt="PepWiki" width="100" style="display:block;">
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <a href="https://github.com/pepwiki" style="color:#b3d4ff;text-decoration:none;margin:0 10px;font-size:13px;">GitHub</a>
                    <a href="https://twitter.com/PepWiki" style="color:#b3d4ff;text-decoration:none;margin:0 10px;font-size:13px;">Twitter</a>
                    <a href="https://www.linkedin.com/company/pepwiki/" style="color:#b3d4ff;text-decoration:none;margin:0 10px;font-size:13px;">LinkedIn</a>
                    <a href="https://www.youtube.com/@PepWiki" style="color:#b3d4ff;text-decoration:none;margin:0 10px;font-size:13px;">YouTube</a>
                    <a href="https://pepwiki.org" style="color:#b3d4ff;text-decoration:none;margin:0 10px;font-size:13px;">Website</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:15px;">
                    <p style="color:#95a5a6;font-size:12px;margin:0;line-height:1.5;">
                      Open-source peptide science tools for researchers, by researchers.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="border-top:1px solid #34495e;padding-top:15px;">
                    <p style="color:#7f8c8d;font-size:11px;margin:0;">
                      You're receiving this because you subscribed to the PepWiki newsletter.
                    </p>
                    <p style="color:#7f8c8d;font-size:11px;margin:5px 0 0;">
                      <a href="[unsubscribe-url]" style="color:#b3d4ff;text-decoration:underline;">Unsubscribe</a> | 
                      <a href="[preferences-url]" style="color:#b3d4ff;text-decoration:underline;">Update Preferences</a> | 
                      <a href="https://pepwiki.org" style="color:#b3d4ff;text-decoration:underline;">Visit Website</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Platform Recommendations

### Substack (Recommended for Beginners)

**Pros:**
- Free to start (no monthly fee)
- Built-in subscriber management
- Simple, clean email design
- Built-in recommendation network
- Easy to set up and manage
- Native podcast and video support

**Cons:**
- Limited customization
- No advanced automation
- Basic analytics
- Less control over subscriber data

**Best For:** Individual researchers, early-stage newsletters, minimal overhead

**Setup Steps:**
1. Create account at substack.com
2. Choose a clean template
3. Set up publication schedule (weekly/bi-weekly)
4. Import existing subscribers (if any)
5. Enable recommendations for growth

---

### ConvertKit (Recommended for Growth)

**Pros:**
- Advanced automation workflows
- Landing pages and forms
- Subscriber tagging and segmentation
- A/B testing for subject lines
- Detailed analytics
- Creator network for cross-promotion

**Cons:**
- Free tier limited to 1,000 subscribers
- Paid plans start at $29/month
- Steeper learning curve
- Less built-in network effect

**Best For:** Growing newsletters, automation needs, professional campaigns

**Setup Steps:**
1. Create account at convertkit.com
2. Set up automation sequences
3. Create landing pages for each tool
4. Set up tagging for subscriber segments
5. Configure A/B testing for subject lines

---

### Mailchimp (Alternative)

**Pros:**
- Free tier up to 500 subscribers
- Drag-and-drop builder
- Good analytics
- Integration with many tools

**Cons:**
- Less creator-focused
- Can get expensive at scale
- Limited automation on free tier

**Best For:** Teams, existing Mailchimp users, budget-conscious

---

## Newsletter Schedule

### Monthly Newsletter Structure

**Week 1:**
- Tool update or new feature
- 1-2 new articles
- Industry news roundup

**Week 2:**
- Educational content
- Quick tips
- Community spotlight

**Week 3:**
- Tool update or tutorial
- Research paper summaries
- Upcoming events

**Week 4:**
- Month in review
- Roadmap preview
- Community highlights

### Automation Sequences

**New Subscriber Welcome:**
1. Day 0: Welcome email with tool overview
2. Day 2: Getting started guide
3. Day 5: Feature spotlight
4. Day 7: Community invitation

**Re-engagement (inactive 30+ days):**
1. Day 30: "We miss you" with tool update
2. Day 37: Highlight new features
3. Day 44: Special offer or exclusive content

---

## Content Guidelines

### Writing Style
- **Tone:** Professional but approachable
- **Length:** 300-500 words per newsletter
- **Paragraphs:** 2-3 sentences max
- **Links:** 5-10 per newsletter
- **Images:** 2-3 relevant visuals

### Subject Line Best Practices
- Keep under 50 characters
- Use numbers when possible
- Create urgency without being spammy
- Personalize when possible
- A/B test regularly

### Key Metrics to Track
- **Open rate:** Target 20-30%
- **Click rate:** Target 3-5%
- **Unsubscribe rate:** Keep under 0.5%
- **Growth rate:** Target 10% month-over-month

### Call-to-Action Strategy
- One primary CTA per newsletter
- Place CTA above the fold
- Repeat CTA at the end
- Use action-oriented language
- Track click-through rates by CTA
