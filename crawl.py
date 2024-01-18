import time
import json
import urllib
import requests
import parsel

url = 'https://minecraft.wiki/w/Block'
header = {"User-Agent": "Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 80.0.3987.122  Safari / 537.36"}
base_url = 'https://minecraft.wiki'

response = requests.get(url=url, headers=header)
response.encoding = "utf-8"
html_data = response.text

html = response.text
response.close()
html = html.encode('gbk','ignore')
html = html.decode("gbk")
with open('content.html', 'w', encoding='utf-8') as f:
    f.write(html_data)

rag_dict = {}
selector = parsel.Selector(html)
result_list = selector.xpath('//div[@class="div-col columns column-width" and @style="-moz-column-width: 19em; -webkit-column-width: 19em; column-width: 19em;"]/ul/li')

for result in result_list:
    content = result.xpath('./a')[-1]
    # print(content)
    title = content.xpath('./@title').get()
    href = content.xpath('./@href').get()
    name = href.split('/')[-1]
    sub_url = base_url + href
    print(name, sub_url)
    s = requests.session()
    s.keep_alive = False
    response = requests.get(url=sub_url, headers=header)
    html = response.text
    response.close()
    # with open('content.html', 'w') as f:
    #     f.write(html)
    selector = parsel.Selector(html)
    description = selector.xpath('//meta[@name="description"]')
    description = description.xpath('./@content').get()
    # print(name, description)
    # break
    rag_dict[name.lower()] = description
    time.sleep(0.1)

with open('rag_dict.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(rag_dict, ensure_ascii=False, indent=4))