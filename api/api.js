// api.js

import { useState, useEffect } from "react";

const useContentfulData = () => {
  const [data, setData] = useState(null);
  const [entry, setEntry] = useState(null);

  const getEntries = async () => {
    try {
      const apiUrl =
        "https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries?access_token=JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk";

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setData(data.items);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getEntry = async (id, locale) => {
    try {
      const apiUrl = `https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries/${id}?access_token=JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setEntry(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return {
    data,
    entry,
    getEntry,
  };
};

export default useContentfulData;

// fetch all entries by contenttype id, optional locale and sort
export const getEntriesByContentType = async (contentType, locale, sort) => {
  try {
    const localeParam = locale && `locale=${locale}&`;
    const sortParam = sort && `order=${sort}&`;
    const apiUrl = `https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries?content_type=${contentType}&${
      sortParam ?? ""
    }${
      localeParam ?? ""
    }include=10&access_token=JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// fetch entry by id. optional locale
export const getEntryByID = async (id, locale) => {
  try {
    const localeParam = locale && `locale=${locale}&`;
    const apiUrl = `https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries/${id}?${
      localeParam ?? ""
    }includes=10&access_token=JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// Pass in array of multiple IDs and fetch all those entries. optional locale and sort
export const getEntriesByIDs = async (ids, locale, sort) => {
  try {
    const localeParam = locale && `locale=${locale}&`;
    const sortParam = sort && `order=${sort}&`;
    const apiUrl = `https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries?sys.id[in]=${ids.join(
      ","
    )}&${sort && sortParam}${
      localeParam ?? ""
    }access_token=JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
