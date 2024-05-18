import React, { useState, useEffect } from 'react';

const EditPage = ({ match }) => {
  const [pageDetails, setPageDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        const response = await fetch(`/api/pages/${match.params.pageId}`);
        const data = await response.json();
        setPageDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching page details:', error);
        setIsLoading(false);
      }
    };

    fetchPageDetails();
  }, [match.params.pageId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPageDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulating updating page details
    try {
      const response = await fetch(`/api/pages/${match.params.pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageDetails),
      });
      if (response.ok) {
        console.log('Page details updated successfully!');
        // Redirect to the page details view after updating
        // You can use React Router for this purpose
      } else {
        console.error('Failed to update page details');
      }
    } catch (error) {
      console.error('Error updating page details:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={pageDetails.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={pageDetails.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPage;
