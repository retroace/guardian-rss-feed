const convert = require('./../src/transformer/xmlTransformer');


describe('/', () => {

  it('xml conversion', async () => {
    const outputXML = '<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel><title>Guardian News</title><link>#</link><description>We provide guardian news title</description><language>en-us</language><item><response><status>ok</status><userTier>developer</userTier><total>1</total><content><id>technology/2014/feb/18/doge-such-questions-very-answered</id><type>article</type><sectionId>technology</sectionId><sectionName>Technology</sectionName><webPublicationDate>2014-02-18T10:25:30Z</webPublicationDate><webTitle>What is Doge?</webTitle><webUrl>https://www.theguardian.com/technology/2014/feb/18/doge-such-questions-very-answered</webUrl><apiUrl>https://content.guardianapis.com/technology/2014/feb/18/doge-such-questions-very-answered</apiUrl><isHosted>false</isHosted><pillarId>pillar/news</pillarId><pillarName>News</pillarName></content></response></item></channel></rss>';
    const input = {
        "response": {
            "status": "ok",
            "userTier": "developer",
            "total": 1,
            "content": {
                "id": "technology/2014/feb/18/doge-such-questions-very-answered",
                "type": "article",
                "sectionId": "technology",
                "sectionName": "Technology",
                "webPublicationDate": "2014-02-18T10:25:30Z",
                "webTitle": "What is Doge?",
                "webUrl": "https://www.theguardian.com/technology/2014/feb/18/doge-such-questions-very-answered",
                "apiUrl": "https://content.guardianapis.com/technology/2014/feb/18/doge-such-questions-very-answered",
                "isHosted": false,
                "pillarId": "pillar/news",
                "pillarName": "News"
            }
        }
    };
    const header = {
      "title" : "Guardian News",
      "link": '#',
      "description": "We provide guardian news title",
      "language": 'en-us'
    };
    let convertedXML = convert(input, header);
    expect(outputXML).toEqual(convertedXML);
  });


  it('xml conversion without header', async () => {
    const outputXML = '<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel><item><response><status>ok</status><userTier>developer</userTier><total>1</total><content><id>technology/2014/feb/18/doge-such-questions-very-answered</id><type>article</type><sectionId>technology</sectionId><sectionName>Technology</sectionName><webPublicationDate>2014-02-18T10:25:30Z</webPublicationDate><webTitle>What is Doge?</webTitle><webUrl>https://www.theguardian.com/technology/2014/feb/18/doge-such-questions-very-answered</webUrl><apiUrl>https://content.guardianapis.com/technology/2014/feb/18/doge-such-questions-very-answered</apiUrl><isHosted>false</isHosted><pillarId>pillar/news</pillarId><pillarName>News</pillarName></content></response></item></channel></rss>';
    const input = {
        "response": {
            "status": "ok",
            "userTier": "developer",
            "total": 1,
            "content": {
                "id": "technology/2014/feb/18/doge-such-questions-very-answered",
                "type": "article",
                "sectionId": "technology",
                "sectionName": "Technology",
                "webPublicationDate": "2014-02-18T10:25:30Z",
                "webTitle": "What is Doge?",
                "webUrl": "https://www.theguardian.com/technology/2014/feb/18/doge-such-questions-very-answered",
                "apiUrl": "https://content.guardianapis.com/technology/2014/feb/18/doge-such-questions-very-answered",
                "isHosted": false,
                "pillarId": "pillar/news",
                "pillarName": "News"
            }
        }
    };
    let convertedXML = convert(input);
    expect(outputXML).toEqual(convertedXML);
  });


});
