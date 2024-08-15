import React, { useEffect, useState, useCallback } from 'react';
import { callApi, replaceUnderscoresWithSpaces } from './../../../../lib/helper';
import { showToast } from './../../../Common/CustomMIniComponents/Toast';
import Loading from './../../../Common/CustomMIniComponents/Loading';
import Error from './../../../Common/CustomMIniComponents/Error';
import StatsCard from './../../../Common/StatsCard';

function DbStats() {
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Define the function to fetch data
  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await callApi({
        endpoint: 'stats/db-stats',
        method: 'GET'
      });
      setData(result);
      // showToast('Data retrieved successfully', 'success');
    } catch (error) {
      setIsError(error.message);
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback with an empty dependency array to memoize the function

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
    <StatsCard heading="DB Stats" refreshOnClick={getData}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center justify-center gap-4">
        {isLoading ? (
          <Loading styleClass="h-52 flex justify-center items-center  col-span-full w-full" />
        ) : isError ? (
          <div className="h-52 flex justify-center items-center  col-span-full w-full font-medium">
            <Error>
            {isError}
            </Error>
          </div>
        ) : (
          Object.keys(data).map((key) => (
            <div key={key} className="border border-orange-700 dark:border-orange-400 rounded-xl mt-2">
              <div className="flex justify-center items-center h-20 font-medium flex-col gap-2">
              <span className="font-medium text-xl">{data[key]}</span>
                <span className="themeSpeText capitalize text-xs">{replaceUnderscoresWithSpaces(key)}</span>
            </div>
            </div>
          ))
        )}
      </div>
    </StatsCard>
  </>
);
}

export default DbStats;