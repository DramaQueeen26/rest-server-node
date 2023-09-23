import express from 'express'

export class Server {

  private app = express()

  async start() {

    this.app.listen( 3000, () => {

      //* Middlewares

      //* Public folder
      this.app.use( express.static('public') )

      console.log('Server running on port 3000')

    })

  }

}