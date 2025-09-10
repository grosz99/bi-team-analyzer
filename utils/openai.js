import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
  dangerouslyAllowBrowser: true
});

export async function analyzeTeam(roles, objectives, skills) {
  const prompt = `
    You are a product development team structure consultant. Analyze this team and provide recommendations based on their SPECIFIC objectives and needs.
    
    Current Team:
    ${roles.map(role => `${role.title}: ${role.description} | Currently: ${role.currentWork}`).join('\n')}
    
    Strategic Objectives:
    ${objectives.join('\n')}
    
    Desired Skills/Capabilities:
    ${skills}
    
    IMPORTANT: Base your recommendations on the ACTUAL objectives and skills mentioned above. If they mention:
    - Software development, web apps, or APIs → Recommend developers (Frontend, Backend, Full-stack, Mobile)
    - Infrastructure or deployment → Recommend DevOps, SRE, Cloud Architect roles
    - Quality or testing → Recommend QA Engineers, Test Automation Engineers
    - User experience → Recommend UX Designers, UI Engineers
    - Machine learning → Recommend ML Engineers, Data Scientists
    - Security → Recommend Security Engineers, Security Analysts
    - Growth → Recommend Growth Engineers, Marketing Engineers
    - Data/BI/Analytics → Recommend Data roles (Data Scientists, Analytics Engineers, etc.)
    
    Provide analysis in JSON format:
    {
      "currentGaps": [
        {
          "area": "Skill/capability area directly tied to stated objectives",
          "impact": "High/Medium/Low",
          "description": "What's missing and why it matters FOR THEIR SPECIFIC GOALS"
        }
      ],
      "recommendedRoles": [
        {
          "title": "Role that directly addresses their stated objectives",
          "description": "Role responsibilities",
          "reasoning": "How this role helps achieve the SPECIFIC objectives mentioned",
          "priority": "High/Medium/Low",
          "timeframe": "Immediate/3-6 months/6-12 months"
        }
      ],
      "roleEnhancements": [
        {
          "existingRole": "Current Role Title",
          "additionalSkills": "Skills to add that align with stated objectives",
          "trainingNeeded": "Specific training recommendations"
        }
      ],
      "strategicInsights": [
        "Insight specifically about achieving their stated objectives",
        "Recommendation tied to their mentioned skills and goals"
      ]
    }
    
    Analyze the objectives carefully and recommend roles that DIRECTLY support what they're trying to build. Don't default to data roles unless their objectives specifically mention data/analytics/BI needs.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a product team structure expert. Return only valid JSON without any markdown formatting or code blocks.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 2000
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}