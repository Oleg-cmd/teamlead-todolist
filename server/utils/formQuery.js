/**
 * Constructs a query object for fetching tasks from a project.
 *
 * @param {Object} req - The request object containing query parameters.
 * @returns {Object} The query object configured for the API request.
 */

export const formQuery = (req) => {
  return {
    // Specifies the fields to expand in the response
    expand: ["names", "schema", "operations"],

    // Specifies the fields to include in the response
    fields: ["summary", "status", "assignee"],

    // Determines whether to group fields by their keys
    fieldsByKeys: false,

    // Constructs a JQL query to fetch tasks from the specified project
    jql: `project = ${req.body.key}`,

    // Maximum number of results to return
    maxResults: req.body.maxResults,

    // Index of the first result to return (for pagination)
    startAt: req.body.startAt,
  };
};
