from langchain.chat_models import ChatOpenAI, AzureChatOpenAI

from voyager.agents.azure_model_config import AzureChatModelConfig


def get_llm(
    model_name: str = "gpt-3.5-turbo",
    temperature: float = 0,
    request_timout: float = 120,
    azure_gpt_4_config: AzureChatModelConfig = AzureChatModelConfig(),
    azure_gpt_35_config: AzureChatModelConfig = AzureChatModelConfig(),
    openai_api_type: str = "",
) -> ChatOpenAI | AzureChatOpenAI:
    if openai_api_type == "azure":
        azure_model_config = azure_gpt_4_config if model_name == "gpt-4" else azure_gpt_35_config
        llm = AzureChatOpenAI(
            temperature=temperature,
            request_timout=request_timout,
            **azure_model_config.dict(),
        )
    else:
        llm = ChatOpenAI(
            model_name=model_name,
            temperature=temperature,
            request_timeout=request_timout,
        )

    return llm
