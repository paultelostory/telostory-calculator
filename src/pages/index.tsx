import type { NextPage } from 'next'
import MacroCalculator from '../components/MacroCalculator'

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-[#0D1117] p-8">
      <MacroCalculator />
    </main>
  )
}

export default Home