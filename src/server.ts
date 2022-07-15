import App from "./app";
import config from "./config";

const app = new App();

const server = app.server.listen(config.server.port, () => {
    console.log(`Server is running on port: ${config.server.port}`)
});

export default server;