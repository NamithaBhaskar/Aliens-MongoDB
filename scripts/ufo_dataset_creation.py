import os
import sys

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import pandas as pd

def download_images(url, folder_path='images'):
    # Create a folder to save images
    os.makedirs(folder_path, exist_ok=True)

    # Make a request to the website
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all image tags
    img_tags = soup.find_all('img')

    for i, img_tag in enumerate(img_tags):
        # Get the source URL of the image
        img_url = img_tag.get('src')
        if ('nuforclogo' not in img_url):

            # Join the URL with the base URL if it is a relative path
            img_url = urljoin(url, img_url)

            # Download the image
            response = requests.get(img_url)

            # img_name = url.split("/")[-1][:-5]
            # Get the image name from the URL
            img_name = os.path.join(folder_path, url.split("/")[-1][:-5] + "-" + str(i) + ".jpg")

            # Save the image locally
            with open(img_name, 'wb') as img_file:
                img_file.write(response.content)
                print(f"Image saved: {img_name}")
        else:
            print("No image found!")


def main():
    if len(sys.argv) > 1:
        filename = str(sys.argv[1])
    else:
        filename = input("Enter the name of the file: ")
    df = pd.read_csv(filename)
    articles = df['report_link']
    for i, article in enumerate(articles):
        download_images(article, 'images')
        print(article, "downloaded")


if __name__ == '__main__':
    main()
