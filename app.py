import cv2
from flask import Flask, render_template
from static import vision

app = Flask(__name__, static_folder='static', template_folder='templates')


@app.route('/')
def hello_world(name=None):
    return render_template('stopit.html', name=name)


@app.route('/stop_it')
def stop_it():
    cap = cv2.VideoCapture(0)

    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()
        file = 'live.png'
        cv2.imwrite(file, frame)

        # print OCR text
        print(vision.localize_objects(file))

        # Display the resulting frame
        cv2.imshow('frame', frame)

    cap.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
