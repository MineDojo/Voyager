# Run With Azure API Deployments

If you are using dedicated OpenAI API deployments on Azure, you can run Voyager by:

```python
from voyager import Voyager
from voyager.agents import AzureChatModelConfig, AzureOpenAIEmbeddingsConfig

# You can also use mc_port instead of azure_login, but azure_login is highly recommended
azure_login = {
    "client_id": "YOUR_CLIENT_ID",
    "redirect_url": "https://127.0.0.1/auth-response",
    "secret_value": "[OPTIONAL] YOUR_SECRET_VALUE",
    "version": "fabric-loader-0.14.18-1.19", # the version Voyager is tested on
}
openai_api_key = "YOUR_API_KEY"

# If you are using OpenAI LLM deployments on Azure, you can config them here
azure_gpt_4_config = AzureChatModelConfig(
    openai_api_base="BASE_URL_FOR_AZURE_GPT4_DEPLOYMENT",
    openai_api_version="GPT4_API_VERSION",
    deployment_name="GPT4_DEPLOYMENT_NAME",
    openai_api_type="azure",
    openai_api_key="YOUR_AZURE_API_KEY",	# Not API keys with prefix "sk-"
)
azure_gpt_35_config = AzureChatModelConfig(
    openai_api_base="BASE_URL_FOR_AZURE_GPT35_DEPLOYMENT",
    openai_api_version="GPT35_API_VERSION",
    deployment_name="GPT35_DEPLOYMENT_NAME",
    openai_api_type="azure",
    openai_api_key="YOUR_AZURE_API_KEY",	# Not API keys with prefix "sk-"
)
azure_openai_embeddings_config = AzureOpenAIEmbeddingsConfig(
    openai_api_base="BASE_URL_FOR_AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT",
    model="MODEL_NAME",		# Check https://platform.openai.com/docs/guides/embeddings/embedding-models
    openai_api_type="azure",
    deployment="YOUR_DEPLOYMENT_NAME",
    openai_api_key="YOUR_AZURE_API_KEY",	# Not API keys with prefix "sk-"
)

voyager = Voyager(
    azure_login=azure_login,
    openai_api_type="azure",
    azure_gpt_4_config=azure_gpt_4_config,
    azure_gpt_35_config=azure_gpt_35_config,
    azure_openai_embeddings_config=azure_openai_embeddings_config,
)

# start lifelong learning
voyager.learn()
```

