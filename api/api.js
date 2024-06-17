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

  const getEntry = async (id) => {
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

const setLocaleParam = (locale) => {
  return locale === "nl" ? "nl" : "en-US";
};

const buildApiUrl = (baseUrl, params) => {
  const queryString = Object.keys(params)
    .filter((key) => params[key] !== undefined)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return `${baseUrl}?${queryString}`;
};

export const getEntriesByContentType = async (contentType, locale, sort) => {
  try {
    const params = {
      content_type: contentType,
      order: sort,
      locale: locale ? setLocaleParam(locale) : undefined,
      include: 10,
      access_token: "JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk",
    };

    const apiUrl = buildApiUrl(
      "https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries",
      params
    );

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

export const getEntryByID = async (id, locale) => {
  try {
    const params = {
      locale: locale ? setLocaleParam(locale) : undefined,
      includes: 10,
      access_token: "JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk",
    };

    const apiUrl = buildApiUrl(
      `https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries/${id}`,
      params
    );

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

export const getEntriesByIDs = async (ids, locale, sort) => {
  try {
    const params = {
      "sys.id[in]": ids.join(","),
      order: sort,
      locale: locale ? setLocaleParam(locale) : undefined,
      access_token: "JIUK52a12pwwal6mqdHN4FWIssE7nrtcR0bs7Xsogpk",
    };

    const apiUrl = buildApiUrl(
      "https://cdn.contentful.com/spaces/yshlrg4y56c9/environments/master/entries",
      params
    );

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
