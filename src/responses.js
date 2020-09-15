const respond = (request, response, status, object, type) => {
  response.writeHead(status, {
    'Content-Type': type,
  });
  response.write(object);
  response.end();
};
/*
function convertXML(request, response, responses, code, type) {

    const responseXML = `
      <response>
        <message>${responses.message}</message>
        <id>${responses.id}</id>
      </response>
    `;

    return respond(request, response, code, responseXML, 'text/xml');

}
*/
const success = (request, response, acceptedTypes) => {
  const responses = {
    message: 'This is a succesful response',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
        <message>${responses.message}</message>
      </response>
    `;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(responses);
  console.log(responseJSON);
  return respond(request, response, 200, responseJSON, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responses = {
    message: 'This request has the required parameters.',
  };

  if (!params.valid || params.valid !== 'true') {
    responses.message = 'Missing valid query parameter set to true.';
    responses.id = 'Bad Request';
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `
      <response>
        <message>${responses.message}</message>
        <id>${responses.id}</id>
      </response>
    `;

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    const responseJSON = JSON.stringify(responses);
    return respond(request, response, 400, responseJSON, 'application/json');
  }
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
        <message>${responses.message}</message>
        <id>${responses.id}</id>
      </response>
    `;

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(responses);
  return respond(request, response, 200, responseJSON, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responses = {
    message: 'You have succesfully viewed the content',
  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responses.message = 'Missing loggedIn query parameter set to yes.';
    responses.id = 'Unauthorized';
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `
      <response>
        <message>${responses.message}</message>
        <id>${responses.id}</id>
      </response>
    `;

      return respond(request, response, 401, responseXML, 'text/xml');
    }

    const responseJSON = JSON.stringify(responses);
    return respond(request, response, 401, responseJSON, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
        <message>${responses.message}</message>
        <id>${responses.id}</id>
      </response>
    `;

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(responses);
  return respond(request, response, 200, responseJSON, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const responses = {
    message: 'You do not have access to this content.',
    id: 'Forbidden',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
        <message>${responses.message}</message>
        <id>${responses.id}</id>
      </response>
    `;

    return respond(request, response, 403, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(responses);
  return respond(request, response, 403, responseJSON, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const responses = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'Internal',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
        <message>${responses.message}</message>
        <id>${responses.id}</id>
      </response>
    `;

    return respond(request, response, 500, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(responses);
  return respond(request, response, 500, responseJSON, 'application/json');
};

const notImp = (request, response, acceptedTypes) => {
  const responses = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'Not Implemented',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
        <message>${responses.message}</message>
        <id>${responses.id}</id>
      </response>
    `;

    return respond(request, response, 501, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(responses);
  return respond(request, response, 501, responseJSON, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responses = {
    message: 'The page you are looking for was not found.',
    id: 'Not Found',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
        <message>${responses.message}</message>
        <id>${responses.id}</id>
      </response>
    `;

    return respond(request, response, 404, responseXML, 'text/xml');
  }
  const responseJSON = JSON.stringify(responses);
  return respond(request, response, 404, responseJSON, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImp,
  notFound,
};
