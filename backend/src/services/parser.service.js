export function parseEmail(text){

  let status="Applied"
 
  if(text.includes("interview")) status="Interview"
  if(text.includes("rejected")) status="Rejected"
 
  const company=text.match(/at (.*)/)?.[1] || "Unknown"
 
  return {
    company,
    role:"Software Engineer",
    status,
    date:new Date()
  }
 }
 