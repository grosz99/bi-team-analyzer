import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
  dangerouslyAllowBrowser: true
});

export async function analyzeTeam(roles, objectives, skills) {
  const prompt = `
    You are a product development team structure consultant. Analyze this team and provide recommendations based on their SPECIFIC objectives and needs.
    
    Current Team Composition:
    ${roles.map(role => `${role.title} (${role.headcount || 1} people): ${role.description} | Currently: ${role.currentWork}`).join('\n')}
    
    Total Team Size: ${roles.reduce((sum, role) => sum + (role.headcount || 1), 0)} people
    
    Strategic Objectives:
    ${objectives.join('\n')}
    
    Desired Skills/Capabilities:
    ${skills}
    
    IMPORTANT ANALYSIS GUIDELINES:
    1. Notice team imbalances (e.g., many analysts but few engineers, or vice versa)
    2. PRIORITIZE UPSKILLING existing team members over hiring new roles when feasible
    3. If you have many people in one role (like visualization analysts), suggest how to upskill them
    4. Base recommendations on ACTUAL objectives mentioned above
    
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
          "reasoning": "Why hire this role vs upskilling existing team",
          "priority": "High/Medium/Low",
          "timeframe": "Immediate/3-6 months/6-12 months",
          "quantity": "Number of people needed in this role"
        }
      ],
      "roleEnhancements": [
        {
          "existingRole": "Current Role Title",
          "numberOfPeople": "How many people in this role could be upskilled",
          "additionalSkills": "Skills to add that align with stated objectives",
          "trainingNeeded": "Specific training recommendations",
          "potentialNewTitle": "What they could become after upskilling"
        }
      ],
      "strategicInsights": [
        "Comment on team balance and composition",
        "Specific upskilling opportunities given your team makeup",
        "Cost-effective ways to achieve objectives with current team"
      ]
    }
    
    Focus heavily on upskilling opportunities, especially if you notice an imbalance in the team (like many analysts that could be trained for other needs). Only recommend new hires when upskilling isn't feasible.
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