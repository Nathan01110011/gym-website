import json
import boto3
import requests
from lxml import html

EMAIL = "[Pure Gym Email/Username]"
PIN = "[Pure Gym Pin Code]"

LOGIN_URL = "https://www.puregym.com/login/"
LOGIN_API_URL = "https://www.puregym.com/api/members/login/"
DASH_URL = "https://www.puregym.com/members/"
ACT_URL = "https://www.puregym.com/members/activity/"


def lambda_handler():

    session_requests = requests.session()

    # Get login auth token
    result = session_requests.get(LOGIN_URL)
    tree = html.fromstring(result.text)
    auth_token = tree.xpath("/html/body/form/input/@value")[0]

    # Create payload
    payload = {
        "associateAccount": "false",
        "email": EMAIL,
        "pin": PIN
    }

    headerpayload = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Host': 'www.puregym.com',
        'Origin': 'https://www.puregym.com',
        'Referer': LOGIN_URL,
        '__RequestVerificationToken': auth_token
    }

    # Perform login
    result = session_requests.post(
        LOGIN_API_URL,
        data=payload,
        headers=headerpayload
    )

    # Report successful login
    print("Login succeeded: ", result.ok)
    print("Status code:", result.status_code)

    # Get activity page information
    result = session_requests.get(
        ACT_URL,
        headers=dict(referer=ACT_URL)
    )

    tree = html.fromstring(result.content)
    lastday = tree.xpath('//*[@id="main-content"]/div[3]/div/div/div/div[3]/div[3]/div/div/ul/li[1]/div/div[1]/text()')
    entrytime = tree.xpath(
        '//*[@id="main-content"]/div[3]/div/div/div/div[3]/div[3]/div/div/ul/li[1]/div/div[2]/text()')
    duration = tree.xpath('//*[@id="main-content"]/div[3]/div/div/div/div[3]/div[3]/div/div/ul/li[1]/div/div[5]/text()')

    # Input into dynamodb
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('pure-gym-tracker')
    table.put_item(
        Item={
            'recent': 'latest',
            'date': str(lastday),
            'duration': str(duration),
            'arrival': str(entrytime),
        }
    )

    table2 = dynamodb.Table('pure-gym-tracker-archive')
    table2.put_item(
        Item={
            'date': str(lastday),
            'duration': str(duration),
            'arrival': str(entrytime),
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
