export const formQuery = (req) => {
  return {
    expand: ["names", "schema", "operations"],
    fields: ["summary", "status", "assignee"],
    fieldsByKeys: false,
    jql: `project = ${req.body.key}`,
    maxResults: req.body.maxResults,
    startAt: req.body.startAt,
  };
};
