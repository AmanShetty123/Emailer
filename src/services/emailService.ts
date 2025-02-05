export const sendEmail = async (recipient: string, subject: string, body: string) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient,
        subject,
        body,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json(); // Simulating success response
  } catch (error) {
    throw new Error(error.message);
  }
};
