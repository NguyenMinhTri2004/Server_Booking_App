import app from "./app";

const server =  app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server is closed');
        process.exit(0);
    });
})
