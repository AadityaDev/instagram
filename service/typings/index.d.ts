import EggMysql from 'egg-mysql';

interface userStructure {
  userId: string
}

declare module 'egg' {
  interface Application {
    mysql: EggMysql,
    router: {
      namespace: function
    },
    passport: {
      authenticate: function
    },
  }

  interface Context {
    returnBody(status: number, message: string, data?: any): function,
    user: userStructure
  }
}