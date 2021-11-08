import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button>
const StatisticLine = ({text, value}) => {
  return ( 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistic = ({allStatistic}) => {
  if (allStatistic.find(statistic => statistic.text === 'all').value === 0) {
    return (
      <div>
        <Header text='statistic' />
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Header text='statistic' />
      <table>
        <tbody>
          {allStatistic.map(statistic => <StatisticLine text={statistic.text} value={statistic.value} key={statistic.text} />)}
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100 + ' %'

  const allStatistic = [
    {text: "good", value: good},
    {text: "neutral", value: neutral},
    {text: "bad", value: bad},
    {text: "all", value: all},
    {text: "average", value: average},
    {text: "positive", value: positive},
  ]

  return (
    <div>
      <Header text='give feedback' />
      <Button clickHandler={() => setGood(good + 1)} text='good' />
      <Button clickHandler={() => setNeutral(neutral + 1)} text='neutral' />
      <Button clickHandler={() => setBad(bad + 1)} text='bad' />
      <Statistic allStatistic={allStatistic}/>
    </div>
  )
}

export default App