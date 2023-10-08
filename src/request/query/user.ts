import { gql } from '@apollo/client'

export const GET_USER_DASHBOARD = gql`
  query me {
    me {
      username
    }
    dashboard {
      scenarios {
        active
        inactive
        completed
      }
      dialogs {
        active
        inactive
        completed
      }
      lists {
        active
        inactive
        completed
      }
    }
  }
`
