const app = require('./middlewares/middlewares')




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        error: {
            message: err.message || "Internal server error"
        }
    })
})

app.listen(4000, () => {
    console.log("server running on 4000")
})
