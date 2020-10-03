// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { useState } from 'react';
import { createContainer } from 'unstated-next';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';






// --------------------------------------------------
//   States
// --------------------------------------------------

const useGcRegister = (initialStateObj) => {


  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  // const [gameCommunityObj, setGameCommunityObj] = useState(lodashGet(initialStateObj, ['gameCommunityObj'], {}));
  // const [userCommunityObj, setUserCommunityObj] = useState(lodashGet(initialStateObj, ['userCommunityObj'], {}));

  const [language, setLanguage] = useState('ja');
  const [country, setCountry] = useState('JP');
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [sortKeyword, setSortKeyword] = useState('');
  const [urlID, setURLID] = useState('');
  const [twitterHashtagsArr, setTwitterHashtagsArr] = useState([]);
  const [searchKeywordsArr, setSearchKeywordsArr] = useState([]);

  const [genre1, setGenre1] = useState('');
  const [genre2, setGenre2] = useState('');
  const [genre3, setGenre3] = useState('');

  const [hardwares1Arr, setHardwares1Arr] = useState([]);
  const [releaseDate1, setReleaseDate1] = useState('');
  const [playersMin1, setPlayersMin1] = useState(1);
  const [playersMax1, setPlayersMax1] = useState(1);
  const [publisherIDs1Arr, setPublisherIDs1Arr] = useState([]);
  const [developerIDs1Arr, setDeveloperIDs1Arr] = useState([]);

  const [hardwares2Arr, setHardwares2Arr] = useState([]);
  const [releaseDate2, setReleaseDate2] = useState('');
  const [playersMin2, setPlayersMin2] = useState(1);
  const [playersMax2, setPlayersMax2] = useState(1);
  const [publisherIDs2Arr, setPublisherIDs2Arr] = useState([]);
  const [developerIDs2Arr, setDeveloperIDs2Arr] = useState([]);

  const [hardwares3Arr, setHardwares3Arr] = useState([]);
  const [releaseDate3, setReleaseDate3] = useState('');
  const [playersMin3, setPlayersMin3] = useState(1);
  const [playersMax3, setPlayersMax3] = useState(1);
  const [publisherIDs3Arr, setPublisherIDs3Arr] = useState([]);
  const [developerIDs3Arr, setDeveloperIDs3Arr] = useState([]);

  const [hardwares4Arr, setHardwares4Arr] = useState([]);
  const [releaseDate4, setReleaseDate4] = useState('');
  const [playersMin4, setPlayersMin4] = useState(1);
  const [playersMax4, setPlayersMax4] = useState(1);
  const [publisherIDs4Arr, setPublisherIDs4Arr] = useState([]);
  const [developerIDs4Arr, setDeveloperIDs4Arr] = useState([]);

  const [hardwares5Arr, setHardwares5Arr] = useState([]);
  const [releaseDate5, setReleaseDate5] = useState('');
  const [playersMin5, setPlayersMin5] = useState(1);
  const [playersMax5, setPlayersMax5] = useState(1);
  const [publisherIDs5Arr, setPublisherIDs5Arr] = useState([]);
  const [developerIDs5Arr, setDeveloperIDs5Arr] = useState([]);

  const [hardwares6Arr, setHardwares6Arr] = useState([]);
  const [releaseDate6, setReleaseDate6] = useState('');
  const [playersMin6, setPlayersMin6] = useState(1);
  const [playersMax6, setPlayersMax6] = useState(1);
  const [publisherIDs6Arr, setPublisherIDs6Arr] = useState([]);
  const [developerIDs6Arr, setDeveloperIDs6Arr] = useState([]);

  const [hardwares7Arr, setHardwares7Arr] = useState([]);
  const [releaseDate7, setReleaseDate7] = useState('');
  const [playersMin7, setPlayersMin7] = useState(1);
  const [playersMax7, setPlayersMax7] = useState(1);
  const [publisherIDs7Arr, setPublisherIDs7Arr] = useState([]);
  const [developerIDs7Arr, setDeveloperIDs7Arr] = useState([]);

  const [hardwares8Arr, setHardwares8Arr] = useState([]);
  const [releaseDate8, setReleaseDate8] = useState('');
  const [playersMin8, setPlayersMin8] = useState(1);
  const [playersMax8, setPlayersMax8] = useState(1);
  const [publisherIDs8Arr, setPublisherIDs8Arr] = useState([]);
  const [developerIDs8Arr, setDeveloperIDs8Arr] = useState([]);

  const [hardwares9Arr, setHardwares9Arr] = useState([]);
  const [releaseDate9, setReleaseDate9] = useState('');
  const [playersMin9, setPlayersMin9] = useState(1);
  const [playersMax9, setPlayersMax9] = useState(1);
  const [publisherIDs9Arr, setPublisherIDs9Arr] = useState([]);
  const [developerIDs9Arr, setDeveloperIDs9Arr] = useState([]);

  const [hardwares10Arr, setHardwares10Arr] = useState([]);
  const [releaseDate10, setReleaseDate10] = useState('');
  const [playersMin10, setPlayersMin10] = useState(1);
  const [playersMax10, setPlayersMax10] = useState(1);
  const [publisherIDs10Arr, setPublisherIDs10Arr] = useState([]);
  const [developerIDs10Arr, setDeveloperIDs10Arr] = useState([]);

  const [linkArr, setLinkArr] = useState([{

    _id: '',
    type: 'Official',
    label: '',
    url: '',

  }]);

  const [imagesAndVideosObj, setImagesAndVideosObj] = useState({

    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'temp',
    arr: [],

  });

  const [imagesAndVideosThumbnailObj, setImagesAndVideosThumbnailObj] = useState({

    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'temp',
    arr: [],

  });



  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return {

    language,
    setLanguage,
    country,
    setCountry,
    name,
    setName,
    subtitle,
    setSubtitle,
    sortKeyword,
    setSortKeyword,
    urlID,
    setURLID,
    twitterHashtagsArr,
    setTwitterHashtagsArr,
    searchKeywordsArr,
    setSearchKeywordsArr,
    genre1,
    setGenre1,
    genre2,
    setGenre2,
    genre3,
    setGenre3,

    hardwares1Arr,
    setHardwares1Arr,
    releaseDate1,
    setReleaseDate1,
    playersMin1,
    setPlayersMin1,
    playersMax1,
    setPlayersMax1,
    publisherIDs1Arr,
    setPublisherIDs1Arr,
    developerIDs1Arr,
    setDeveloperIDs1Arr,

    hardwares2Arr,
    setHardwares2Arr,
    releaseDate2,
    setReleaseDate2,
    playersMin2,
    setPlayersMin2,
    playersMax2,
    setPlayersMax2,
    publisherIDs2Arr,
    setPublisherIDs2Arr,
    developerIDs2Arr,
    setDeveloperIDs2Arr,

    hardwares3Arr,
    setHardwares3Arr,
    releaseDate3,
    setReleaseDate3,
    playersMin3,
    setPlayersMin3,
    playersMax3,
    setPlayersMax3,
    publisherIDs3Arr,
    setPublisherIDs3Arr,
    developerIDs3Arr,
    setDeveloperIDs3Arr,

    hardwares4Arr,
    setHardwares4Arr,
    releaseDate4,
    setReleaseDate4,
    playersMin4,
    setPlayersMin4,
    playersMax4,
    setPlayersMax4,
    publisherIDs4Arr,
    setPublisherIDs4Arr,
    developerIDs4Arr,
    setDeveloperIDs4Arr,

    hardwares5Arr,
    setHardwares5Arr,
    releaseDate5,
    setReleaseDate5,
    playersMin5,
    setPlayersMin5,
    playersMax5,
    setPlayersMax5,
    publisherIDs5Arr,
    setPublisherIDs5Arr,
    developerIDs5Arr,
    setDeveloperIDs5Arr,

    hardwares6Arr,
    setHardwares6Arr,
    releaseDate6,
    setReleaseDate6,
    playersMin6,
    setPlayersMin6,
    playersMax6,
    setPlayersMax6,
    publisherIDs6Arr,
    setPublisherIDs6Arr,
    developerIDs6Arr,
    setDeveloperIDs6Arr,

    hardwares7Arr,
    setHardwares7Arr,
    releaseDate7,
    setReleaseDate7,
    playersMin7,
    setPlayersMin7,
    playersMax7,
    setPlayersMax7,
    publisherIDs7Arr,
    setPublisherIDs7Arr,
    developerIDs7Arr,
    setDeveloperIDs7Arr,

    hardwares8Arr,
    setHardwares8Arr,
    releaseDate8,
    setReleaseDate8,
    playersMin8,
    setPlayersMin8,
    playersMax8,
    setPlayersMax8,
    publisherIDs8Arr,
    setPublisherIDs8Arr,
    developerIDs8Arr,
    setDeveloperIDs8Arr,

    hardwares9Arr,
    setHardwares9Arr,
    releaseDate9,
    setReleaseDate9,
    playersMin9,
    setPlayersMin9,
    playersMax9,
    setPlayersMax9,
    publisherIDs9Arr,
    setPublisherIDs9Arr,
    developerIDs9Arr,
    setDeveloperIDs9Arr,

    hardwares10Arr,
    setHardwares10Arr,
    releaseDate10,
    setReleaseDate10,
    playersMin10,
    setPlayersMin10,
    playersMax10,
    setPlayersMax10,
    publisherIDs10Arr,
    setPublisherIDs10Arr,
    developerIDs10Arr,
    setDeveloperIDs10Arr,

    linkArr,
    setLinkArr,

    imagesAndVideosObj,
    setImagesAndVideosObj,
    imagesAndVideosThumbnailObj,
    setImagesAndVideosThumbnailObj,

  };


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export const ContainerStateGcRegister = createContainer(useGcRegister);
