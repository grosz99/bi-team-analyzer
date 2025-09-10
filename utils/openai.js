import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
  dangerouslyAllowBrowser: true
});

export async function analyzeTeam(roles, objectives, skills) {
  const systemPrompt = `You are a strategic team structure consultant. 
Your PRIMARY job is to analyze the team's GOALS and determine the BEST PATH to achieve them - whether through hiring, retraining, or reorganizing.

ANALYSIS APPROACH:
1. Start with the strategic objectives - what are they trying to achieve?
2. Map required capabilities to achieve those objectives
3. Assess current team against required capabilities
4. Recommend the most efficient path to fill gaps (considering team sizing assessments)

STRICT OUTPUT FORMAT:
Return ONLY valid JSON with the following structure:
{
  "currentGaps": [
    {
      "area": "Specific skill/capability gap",
      "impact": "High/Medium/Low",
      "description": "Why this gap matters for their objectives",
      "tiedToObjective": "Which specific objective this affects"
    }
  ],
  "recommendedRoles": [
    {
      "title": "Specific role title (e.g., Full-Stack Developer, DevOps Engineer)",
      "description": "3-4 specific responsibilities this role would handle",
      "technologies": ["Tech1", "Tech2", "Tech3"],
      "reasoning": "Why hire this role vs upskilling existing team",
      "priority": "High/Medium/Low",
      "timeframe": "Immediate/3-6 months/6-12 months",
      "quantity": 1,
      "tiedToObjective": "Which specific objective this addresses"
    }
  ],
  "roleEnhancements": [
    {
      "existingRole": "Current Role Title from the team",
      "skillsToAdd": ["Specific skill 1", "Specific skill 2"],
      "trainingNeeded": "Concrete training path (courses, certifications, practice projects)",
      "whyNeeded": "How these skills help achieve the stated objectives",
      "timeToTrain": "2-3 months",
      "feasibility": "High/Medium/Low"
    }
  ],
  "strategicInsights": [
    "How each objective will be achieved with recommended changes",
    "Cost-benefit analysis of retraining vs hiring",
    "Timeline for achieving all objectives",
    "Risk factors and mitigation strategies"
  ]
}

CRITICAL ANALYSIS RULES:
1. START WITH THE OBJECTIVES - What are they trying to build/achieve?
2. For EACH objective, identify:
   - What capabilities are needed
   - Who on the current team could do this
   - What gaps exist
3. For currentGaps: Focus on CAPABILITY GAPS (what the team can't do), not just restating the desired skills
   - Bad: "Front-end development skills" (just restates the input)
   - Good: "No one can build React components or implement responsive designs"
4. For roleEnhancements: Analyze EVERY EXISTING ROLE and identify what they need to learn
   - Even if a role seems fine, identify skills that would make them more effective
   - Be specific about training paths and timelines
5. Create a HOLISTIC plan considering team sizing:
   - Overstaffed roles as retraining opportunities
   - Understaffed roles that need more people
   - Missing skills that require new hires
6. Your recommendations should form a COMPLETE ROADMAP to achieve ALL objectives
7. Be specific: "To build [objective X], you need [capability Y], which can be filled by [solution Z]"`;

  const userPrompt = `
Current Team Composition:
${roles.map(role => `${role.title} (Team Size: ${role.teamSize || 'right-sized'}): ${role.description} | Currently: ${role.currentWork}`).join('\n')}

Team Sizing Assessment:
- "understaffed/Need More" = This role needs more people to handle workload
- "right-sized" = Team size is appropriate for current needs
- "overstaffed/Too Many" = Have more people than needed in this role

Strategic Objectives:
${objectives.join('\n')}

Desired Skills/Capabilities:
${skills}

PROVIDE A HOLISTIC ANALYSIS:
1. For each objective, explain what's needed to achieve it
2. Map current team capabilities to objectives
3. Identify gaps and provide specific solutions
4. Create a complete roadmap showing how to achieve ALL objectives with minimal cost (prioritize retraining overstaffed roles over new hires where possible)

Your analysis should answer: "How do we achieve our objectives with the team we have, and what specific changes are needed?"`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userPrompt
      }
    ],
    temperature: 0.3,
    max_tokens: 3000,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}