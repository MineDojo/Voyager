from pydantic import BaseModel


class AzureChatModelConfig(BaseModel):
    """AzureChatOpenAI config profile"""
    openai_api_base: str = ''
    openai_api_version: str = ''
    deployment_name: str = ''
    openai_api_type: str = 'azure'
    openai_api_key: str = ''


class AzureOpenAIEmbeddingsConfig(BaseModel):
    """OpenAIEmbeddings config profile"""
    openai_api_base: str = ''
    model: str = ''
    openai_api_type: str = 'azure'
    deployment: str = ''
    openai_api_key: str = ''
