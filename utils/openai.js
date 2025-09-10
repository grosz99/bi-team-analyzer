import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
  dangerouslyAllowBrowser: true
});

export async function analyzeTeam(roles, objectives, skills) {
  const prompt = `
    You are a Business Intelligence team structure consultant. Analyze this BI team:
    
    Current BI Team:
    ${roles.map(role => `${role.title}: ${role.description} | Currently: ${role.currentWork}`).join('\n')}
    
    Strategic Objectives:
    ${objectives.join('\n')}
    
    Desired Skills/Capabilities:
    ${skills}
    
    Provide analysis in JSON format:
    {
      "currentGaps": [
        {
          "area": "Skill/capability area",
          "impact": "High/Medium/Low",
          "description": "What's missing and why it matters"
        }
      ],
      "recommendedRoles": [
        {
          "title": "New Role Title",
          "description": "Role responsibilities",
          "reasoning": "Why this role is needed",
          "priority": "High/Medium/Low",
          "timeframe": "Immediate/3-6 months/6-12 months"
        }
      ],
      "roleEnhancements": [
        {
          "existingRole": "Current Role Title",
          "additionalSkills": "Skills to add",
          "trainingNeeded": "Specific training recommendations"
        }
      ],
      "strategicInsights": [
        "Key insight about team evolution",
        "Recommendation for skills development"
      ]
    }
    
    Focus on practical BI/analytics roles and emerging needs like MLOps, Data Science, Cloud Analytics, DataOps, Analytics Engineering.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a BI team structure expert. Return only valid JSON without any markdown formatting or code blocks.'
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