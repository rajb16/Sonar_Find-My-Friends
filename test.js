async function takeAndUploadPhotoAsync() {
  // Display the camera to the user and wait for them to take a photo or to cancel
  // the action
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (result.cancelled) {
    return;
  }

  // ImagePicker saves the taken photo to disk and returns a local URI to it
  let localUri = result.uri;
  let filename = localUri.split('/').pop();

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  formData.append('photo', { uri: localUri, name: filename, type });

  return await fetch(YOUR_SERVER_URL, {
    method: 'POST',
    body: formData,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
}