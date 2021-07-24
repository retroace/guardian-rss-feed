# Guardian Rss Feed
This is sample project for exposing the api provided by guardian to rss. To use rss feed for an article type use the route **/article/{subject}** and to clear the cache use **/clear-cache**

## File Structure

- src       // Root folder all your code goes here
  - controllers        // All controllers
  - drivers            // All drivers like cache, mail goes here
  - middlewares        // All middlewares
  - routes             // All routes
  - services           // All third party services and bridge
  - transformers       // Transforming happens here
- tests    // Write your test here
- logs     // Logs generated from docker arrives here

## Bootstrapping Project
To get up and running with the project follow the steps provided below

- Copy **.env.example** file to **.env** and add your credentials
- Give executable permission to **dockerCmd** file
  ```
  If you are on unix based system use

  sudo chmod +x dockerCmd
  ```

- Run command ```./dockerCmd up```


If you want to run test inside docker use ```./dockerCmd test``` command from the root directory. It will generate coverage report

