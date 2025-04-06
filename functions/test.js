exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Test function is working correctly!",
      timestamp: new Date().toISOString()
    })
  };
};