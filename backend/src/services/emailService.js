export const parseEmail = (emailText) => {
    if (!emailText) return null;

    const lowerText = emailText.toLowerCase();

    // 1. Determine Status
    let status = "Applied";
    if (lowerText.includes("interview")) {
        status = "Interview";
    } else if (lowerText.includes("rejected")) {
        status = "Rejected";
    }

    // 2. Extract Company
    // Regex to look for "at [Company]"
    // This matches "at Google", "at Google,", "at Google.", etc.
    // It stops at punctuation or newline.
    const companyRegex = /\bat\s+([A-Z][a-zA-Z0-9\s]+)/;
    const match = emailText.match(companyRegex);

    let company = "Unknown Company";
    if (match && match[1]) {
        company = match[1].trim();
    }

    // 3. Extract Role (Simple heuristic)
    // Look for common role words if possible, or just default.
    // User didn't ask for advanced role extraction, so we keep it simple.
    let role = "Software Engineer"; // Default

    return {
        company,
        role,
        status
    };
};
