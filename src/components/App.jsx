import React, { Component } from 'react';
import Section from './Section';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';


class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  }

  handleBtnClick = evt => {
    const { name } = evt.currentTarget;
    this.setState((prevState => {
        return { [ name ]: prevState[name] + 1 };
      }))
  }

  countTotalFeedback = () => {
    return Object.values(this.state).reduce(
      (acc, feedback) => {
        return acc + feedback;
      }, 0);
  }

  countPositiveFeedbackPercentage = () => {
    return parseInt(
      (100 / Number(this.countTotalFeedback(this.state))) * Number(this.state.good)
    );
  }

  render () {
    const { good, neutral, bad } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <div>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={Object.keys(this.state)}
              onLeaveFeedback={this.handleBtnClick}
            />
          </Section>
          <Section title="Statistics">
            {this.countTotalFeedback() ? (
              <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
              />
            ) : (
              <Notification message="There is no feedbacks" />
            )}
          </Section>
        </div>
      </div>
    )
  }
}

export default App;
