import io
import cv2
from PIL import Image
import requests
import time

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types
# export GOOGLE_APPLICATION_CREDENTIALS="cmd-f-077e0d81dfbf.json"

# Instantiates a client
# client = vision.ImageAnnotatorClient()

banned_object_list = ["Mobile phone", "Canned packaged goods"]


def localize_objects(path):
    """Localize objects in the local image.

    Args:
    path: The path to the local file.
    """
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()

    with open(path, 'rb') as image_file:
        content = image_file.read()
    image = vision.types.Image(content=content)

    objects = client.object_localization(
        image=image).localized_object_annotations

    print('Number of objects found: {}'.format(len(objects)))
    for object_ in objects:
        print('\n{} (confidence: {})'.format(object_.name, object_.score))

        if object_.name in banned_object_list:
            requests.get('http://192.168.43.23:5000/stopit')
            time.sleep(5)