import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Authorization from './pages/authorization/authorization'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Dashboard from './pages/dashboard/dashboard'
import DynamicStyle from './components/dynamicStyles'
import PrivateRoute from './PrivateRoutes'

const httpLink = createHttpLink({
  uri: 'https://graphql-demo.dev.aicall.ru/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.replace('"', '')}` : '',
    },
  }
})

const Routing = () => {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({ addTypename: false }),
  })
  return (
    <ApolloProvider client={client}>
      <DynamicStyle />
      <BrowserRouter>
        <PrivateRoute>
          <Route path='/login' element={<Authorization />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </PrivateRoute>
      </BrowserRouter>
      <script src='https://cdn.jsdelivr.net/npm/chart.js'></script>
    </ApolloProvider>
  )
}

export default Routing
