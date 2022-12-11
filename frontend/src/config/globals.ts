export const variables = {
     //при запуске на другом url / порту значения поменять

    FRONTEND_URL: 'http://localhost:',
    FRONTEND_PORT: '8080',

    BACKEND_URL_JSONSERVER: 'http://localhost:',
    BACKEND_URL_JSONAUTH: 'http://localhost:',
    BACKEND_PORT_JSONSERVER: "3000",
    BACKEND_PORT_JSONAUTH: '4000',
}

export const globals = {
    //при запуске на другом url / порту значения поменять

    BACKEND_URL_JSONSERVER_ADDRESS: variables.BACKEND_URL_JSONSERVER + variables.BACKEND_PORT_JSONSERVER,
    BACKEND_URL_JSONAUTH_ADDRESS: variables.BACKEND_URL_JSONAUTH + variables.BACKEND_PORT_JSONAUTH,
    FRONTEND_URL_ADDRESS: variables.FRONTEND_URL + variables.FRONTEND_PORT,
};