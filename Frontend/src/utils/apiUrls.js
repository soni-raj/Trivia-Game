/**
 * @Post
 * This API is for storing QNA of an User
 */
export const TRIVIA_SAVE_QNA =
  "https://2ylfpcnw5h.execute-api.us-east-1.amazonaws.com/default/triviaSaveUserData";
/**
 * @Post
 * This API is for Checking QNA of an User
 *
 */
export const TRIVIA_CHECK_QNA =
  "https://qgljdn3u86.execute-api.us-east-1.amazonaws.com/default/triviaCheckUserData";

/**
 * @Post
 * This API is for Checking if a email exist in Table
 *
 */
export const TRIVIA_CHECK_EMAIL_EXIST =
  "https://gqbgh43tn0.execute-api.us-east-1.amazonaws.com/default/triviaCheckEmailExist";

/**
 * @Post
 * This API is for saving Profile Picture of a Single User
 *
 */
export const TRIVIA_S3_OPERATIONS =
  "https://bm3vcgukr6.execute-api.us-east-1.amazonaws.com/default/triviaS3Crud";

////////////////////////////////////
////////////////////////////////////
//User CRUD Opeartions
////////////////////////////////////
////////////////////////////////////
/**
 * @Post
 * This API is for editing  Users's Information
 * ONLY EMAIL IS REQUIRED REST FIELDS ARE OPTIONALS 
 * payload = "email",
  *         "lastname",
            "total_points",
            "win_loss",
            "firstname",
            "games_played"
 *
 */
export const TRIVIA_EDIT_USER_DETAIL =
  "https://1avdpqxrm4.execute-api.us-east-1.amazonaws.com/default/triviaEditUserDetails";

//////////////////////////////////
/**
 * @Post
 * This API is for getting Data of a Single User
 * payload = "email",
 *
 */
export const TRIVIA_GET_USER_DETAIL =
  "https://84aajwise3.execute-api.us-east-1.amazonaws.com/default/triviaGetUserData";
//////////////////////////////////
/**
 * @Get
 * This API is for getting All Users
 *
 */
export const TRIVIA_GET_ALL_USERS =
  "https://c9zptyvpv7.execute-api.us-east-1.amazonaws.com/default/triviaGetAllUsersData";

export const TRIVIA_CONTENT_MANAGEMENT = "https://a42hfubjdc.execute-api.us-east-1.amazonaws.com/prod";

// FEATURE 3: TEAM MANAGEMENT APIs

export const GET_USER_TEAMS_BY_EMAIL =
  "https://s5z3dlayhe.execute-api.us-east-1.amazonaws.com/t1/user-teams";
export const CREATE_TEAM =
  "https://aeka0y8sci.execute-api.us-east-1.amazonaws.com/t1/create-team";
export const REMOVE_TEAM_MEMBER =
  "https://g12mymqu00.execute-api.us-east-1.amazonaws.com/t1/remove-member";
export const INVITE_TEAM_MEMBER =
  "https://43oo1kgp3b.execute-api.us-east-1.amazonaws.com/t1/inviteteammember";
export const UPDATE_TEAM_MEMBER_ROLE =
  "https://9m5y4kp37i.execute-api.us-east-1.amazonaws.com/t1/update-member-role";
export const UPDATE_TEAM_BY_TEAM_ID =
  "https://j3nw67updb.execute-api.us-east-1.amazonaws.com/update-team";

export const GET_TEAM_BY_TEAM_ID =
  "https://h26hqa9ooe.execute-api.us-east-1.amazonaws.com/get-team";
export const SUBSCRIBE_EMAIL =
  "https://wb6tyr72mb.execute-api.us-east-1.amazonaws.com/default/triviaConfirmEmail";

// FEATURE 6: LEADERBOARD APIs

export const GET_LEADERBOARD_DATA_API = 
'https://cy6at42lf6.execute-api.us-east-1.amazonaws.com/getLeaderboardData';
export const GET_TOP_PERFORMING_PLAYERS_API = 
"https://cy6at42lf6.execute-api.us-east-1.amazonaws.com/getTopPerformingPlayer";
export const GET_TOP_PERFORMING_TEAMS_API = 
"https://cy6at42lf6.execute-api.us-east-1.amazonaws.com/getTopPerformingTeams";