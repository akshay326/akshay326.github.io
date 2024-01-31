# Chaiverse: Quick Start Guide

Welcome fellow explorer! Today we'll dive into how as an Machine Learning Engineer, I submitted a fine-tuned model via the revolutionary AI crowdsourcing platform - the Chaiverse. Hold onto your hats, here we go!
Here's the colab notebook: https://colab.research.google.com/drive/1iBopRkUnF5_R0VUZpxICvgOThAoQP3UR?authuser=3#scrollTo=M4rauAXbTWI1

## Welcome to Chaiverse! 🚀

Throughout this post, we're going to walk you through submitting a Huggingface model to Chai, gather real-time user feedback, browse through the Chaiverse leaderboard, retrieve a lost model submission, and deactivate your model(this is for when you're ready to make your own submission). Buckle up!

## Installation and Login 👋

First, we need to install and login to the Chaiverse. For this, you'll need your developer key, you can obtain this by joining the Chaiverse Discord. Don't worry about remembering it, your terminal will keep track.

``` python
!pip install -U chaiverse
```

``` python
import chaiverse as chai

chai.developer_login()
```

## Submitting Your First Model 🧑‍🚀

So, you're ready to submit your model? Great! To do this, you first need to push your model to Huggingface. In tandem, also push the tokenizer and your model's architecture configuration. This helps us verify your model type.

``` python
import chaiverse as chai

model_url = "ChaiML/phase2_winner_13b2" # Your model URL

generation_params = {
    'temperature': 0.99,
    'top_p': 0.2,
    "top_k": 40,
    "stopping_words": ['\n'],
    "presence_penalty": 0.5,
    "frequency_penalty": 0.5,
    "max_input_tokens": 1024,
    "best_of": 4
    }
submission_parameters = {'model_repo': model_url, 'generation_params': generation_params, 'model_name': 'my-awesome-llama'}

submitter = chai.ModelSubmitter(verbose=True)
submission_id = submitter.submit(submission_parameters)
```

## Chat with Your Submission 💬

Once submitted, let's verify your model by chatting with the deployed bots. Choose a bot and start up a conversation.

``` python
chatbot = chai.SubmissionChatbot(submission_id)
chatbot.show_available_bots()

chatbot.chat('leo', show_model_input=False)
```

## Getting Model Feedback From Real Life Users 📖

``` python
model_feedback = chai.get_feedback(submission_id)
model_feedback.sample()

df = model_feedback.df
df.head()

raw_data = model_feedback.raw_data
```
## Getting Chaiverse Leaderboard 🥇

Wondering how your model is performing? Check the leaderboard.

``` python
leaderboard = chai.display_leaderboard()

leaderboard = chai.display_leaderboard(detailed=True)
```

## Retrieving Your Submission IDs + Deactivating Models 😶‍🌫️

Just in case you've misplaced your submission IDs, it's easy to retrieve them.

``` python
submission_ids = chai.get_my_submissions()
submission_ids
```

## Conclusion

That wraps up our walkthrough. We've covered everything from installations to submitting and evaluating your model. All the best on your journey!

Happy AI building!
