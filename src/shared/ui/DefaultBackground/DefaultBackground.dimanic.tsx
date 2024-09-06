import dynamic from 'next/dynamic'

export const DefaultBackground = dynamic(() => import('./DefaultBackground'), {
  loading: () => <p>Loading...</p>,
})