import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className='error-message'>
      <p>There is something wrong: {error.message}</p>
    </div>
  )
}

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
}
