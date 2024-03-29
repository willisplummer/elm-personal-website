module Data exposing (..)

import Dict exposing (fromList)
import Types exposing (Project, ReadingList, BookList, Book)
import Yaml.Decode exposing (..)
import Result exposing (Result)

type alias BookEntry =
  { title: String
  , author: String
  , year: Int
  }

decoder : Decoder BookEntry
decoder =
  map3 BookEntry
    (field "title" string)
    (field "author" string)
    (field "year" int)

decodeReadingList : String -> Result Error (List BookEntry)
decodeReadingList =
  fromString (list decoder) 

mkReadingList: String -> ReadingList
mkReadingList ymlString =
  let
      list : List BookEntry
      list = Result.withDefault [] <| decodeReadingList ymlString


      addEntryToList : BookEntry -> ReadingList -> ReadingList
      addEntryToList book acc = Dict.update book.year (\entries -> Just <| ( book.title, book.author) :: Maybe.withDefault [] entries) acc

      readingList: ReadingList 
      readingList= List.foldr addEntryToList reading list
  in
    readingList     

reading : ReadingList
reading =
    fromList
        [ ( 2023,
            [ ( "the fall of babel", "josiah bancroft")
            , ( "the hod king", "josiah bancroft" )
            , ( "the ministry for the future", "kim stanley robinson" )
            , ( "rainwater harvesting for drylands and beyond vol. 1", "brad lancaster")
            , ( "mating", "norman rush")
            , ( "whites", "norman rush")
            , ( "the pillowman", "martin mcdonagh")
            , ( "the twilight world", "werner herzog")
            ]
          ), ( 2022,
            [ ( "pure colour", "sheila heti")
            , ( "blood meridian", "cormac mccarthy")
            , ( "moon witch, spider king", "marlon james")
            , ( "convenience store woman", "sayaka murata")
            , ( "black leopard, red wolf", "marlon james")
            , ( "on earth we're briefly gorgeous", "ocean vuong")
            , ( "waking up in the sea", "derek dunfee")
            , ( "vintage sadness", "hanif willis abduraqib")
            , ( "cold spring harbor", "richard yates")
            ]
          )
        , ( 2021
          , [ ("we die in italy", "sarah jean alexander")
            , ("even two hands pressed together are split", "sarah o'neal")
            , ( "rock wagram", "william saroyan")
            , ( "the dead do not improve", "jay caspian kang")
            , ( "cats cradle", "kurt vonnegut")
            , ( "masters of atlantis", "charles portis" )
            , ( "true grit", "charles portis" )
            , ( "norwood", "charles portis" )
            , ( "the art of raising a puppy", "the monks of new skete" )
            , ( "gringos", "charles portis" )
            , ( "returning the sword to the stone", "mark leidner" )
            , ( "barbarian days: a surfing life", "william finnegan" )
            , ( "kook", "peter heller" )
            ]
          )
        , ( 2020
          , [ ( "the lying lives of adults", "elena ferrante" )
            , ( "the martian", "andy weir" )
            , ( "meyer", "stephen dixon" )
            , ( "call me by your name", "andré aciman" )
            , ( "gould", "stephen dixon" )
            , ( "fake accounts (galley)", "lauren oyler" )
            , ( "arkansas", "john brandon" )
            , ( "beauty was the case that they gave me (reread)", "mark leidner" )
            , ( "100 poems from the chinese", "kenneth rexroth" )
            , ( "leave society (second draft)", "tao lin" )
            , ( "king of a hundred horsemen", "marie etienne" )
            , ( "like life", "lorrie moore" )
            , ( "microaggressions", "erik stinson" )
            , ( "alien abduction", "lewis warsh" )
            , ( "$50,000", "andrew weatherhead" )
            , ( "poker", "tomaž šalamun" )
            , ( "actual air (reread)", "david berman" )
            , ( "franny and zooey", "jd salinger" )
            , ( "some trick", "helen dewitt" )
            , ( "dog of the south", "charles portis" )
            , ( "my struggle: book 1", "karl ove knausgård" )
            , ( "trout fishing in america", "richard brautigan" )
            , ( "the lunatic", "charles simic" )
            , ( "remainder", "tom mccarthy" )
            , ( "days", "mary robison" )
            , ( "77 dream songs", "john berryman" )
            , ( "preliminary materials for a theory of the young-girl", "tiqqun" )
            , ( "hamburger in the archive", "jen calleja" )
            , ( "footballers who rhyme", "audun mortensen" )
            , ( "i love my job", "sam weselowski" )
            , ( "into longing vast rose", "mai ivfjäll" )
            , ( "time and materials", "robert hass" )
            , ( "poet in new york", "federico garcía lorca" )
            , ( "the woodlands", "cate peebles" )
            , ( "who is rich", "matthew klam" )
            , ( "sam the cat and other stories", "matthew klam" )
            , ( "the lichtenberg figures", "ben lerner" )
            , ( "normal people", "sally rooney" )
            , ( "the topeka school", "ben lerner" )
            ]
          )
        , ( 2019
          , [ ( "there must be some mistake", "frederick barthelme" )
            , ( "waveland", "frederick barthelme" )
            , ( "elroy nights", "frederick barthelme" )
            , ( "catching the big fish", "david lynch" )
            , ( "why did i ever", "mary robison" )
            , ( "revolutionary road", "richard yates" )
            , ( "lightning rods", "helen dewitt" )
            , ( "painted desert", "frederick barthelme" )
            , ( "fathers day", "matthew zapruder" )
            , ( "rabbit redux", "john updike" )
            , ( "was this man a genius? talks with andy kaufman", "julie hecht" )
            , ( "the brothers", "frederick barthelme" )
            , ( "the poems of alfred starr hamilton", "alfred starr hamilton" )
            , ( "the last samurai", "helen dewitt" )
            , ( "natural selection", "frederick barthelme" )
            , ( "conversations with friends", "sally rooney" )
            , ( "temple of the golden pavilion", "yukio mishima" )
            , ( "tom sawyer", "joey grantham" )
            , ( "magical negro", "morgan parker" )
            , ( "there are more beautiful things than beyoncé", "morgan parker" )
            , ( "woods and clouds interchangeable", "michael earl craig" )
            , ( "chroma", "frederick barthelme" )
            , ( "the secret history", "donna tartt" )
            , ( "an amateur's guide to the night", "mary robison" )
            , ( "tracer", "frederick barthelme" )
            , ( "second marriage", "frederick barthelme" )
            , ( "the ghost soldiers", "james tate" )
            , ( "wittgenstein's mistress", "david markson" )
            , ( "death's end", "liu cixin" )
            , ( "arm of the sphinx", "josiah bancroft" )
            , ( "senlin ascends", "josiah bancroft" )
            , ( "the new old paint", "susie timmons" )
            , ( "the lost pilot", "james tate" )
            , ( "locked from the outside", "susie timmons" )
            , ( "starship troopers", "robert a heinlein" )
            , ( "joy of missing out", "ana bozicevic" )
            , ( "24 pages and other poems", "lisa fishman" )
            , ( "hog wild", "susie timmons" )
            , ( "dungeon world", "sage latorra and adam koebel" )
            , ( "autobiography of death", "kim hyesoon" )
            , ( "touché", "rod smith" )
            , ( "a roll of the dice will never abolish chance", "stéphane mallarmé" )
            , ( "spring and all", "william carlos williams" )
            , ( "childhood's end", "arthur c clarke" )
            , ( "happy trails to you", "julie hecht" )
            , ( "the unprofessionals", "julie hecht" )
            , ( "moon deluxe", "frederick barthelme" )
            , ( "& the real stormy daniels band", "rebecca r. peel" )
            , ( "the days of abandonment", "elena ferrante" )
            , ( "do the windows open", "julie hecht" )
            ]
          )
        , ( 2018
          , [ ( "rabbit, run", "john updike" )
            , ( "liveblog (didnt finish)", "megan boyle" )
            , ( "reveries of a solitary walker", "jean-jacques rousseau" )
            , ( "sometimes a great notion", "ken kesey" )
            , ( "reasons to live", "amy hempel" )
            , ( "the contemporary short story packet", "ed. tao lin for course at sarah lawrence" )
            , ( "i love dick", "chris kraus" )
            , ( "harry potter and the sorcerer's stone", "jk rowling" )
            , ( "the dark forest", "liu cixin" )
            , ( "the three-body problem", "liu cixin" )
            , ( "at the gates of the animal kingdom", "amy hempel" )
            , ( "wapshot scandal", "donald cheever" )
            , ( "the passion according to g.h.", "clarice lispector" )
            , ( "reasons to live", "amy hempel" )
            , ( "bob the gambler", "frederick barthelme" )
            , ( "in the belly of the beast", "jack abbot" )
            , ( "journals", "paul blackburn" )
            , ( "jesus' son", "dennis johnson" )
            , ( "(american short story anthology i don't remember the name of, read about a third, anne beattie bio inaccurately described falling in place as a short story collection)", "unsure" )
            , ( "subtraction", "mary robison" )
            , ( "the quick and the dead", "joy williams" )
            , ( "oh!", "mary robison" )
            , ( "the cows", "lydia davis" )
            , ( "life is with people (drawings)", "atticus lish" )
            , ( "dubliners", "james joyce" )
            , ( "i await the devil's coming", "mary maclane" )
            , ( "two against one", "frederick barthelme" )
            , ( "a streetcar named desire", "tennessee williams" )
            , ( "breaking open the head", "daniel pinchbeck" )
            , ( "three talks", "joshua beckman" )
            , ( "the lives of the poems", "joshua beckman" )
            , ( "ii cybernetic frontiers", "stewart brand" )
            , ( "the others", "matthew rohrer" )
            , ( "motherhood", "sheila heti" )
            , ( "the homesick diner", "anne tyler" )
            , ( "ties", "domenico starnone" )
            , ( "fuck seth price", "seth price" )
            , ( "the bell jar", "sylvia plath" )
            , ( "tell me a riddle", "tillie olsen" )
            , ( "chilly scenes of winter", "ann beattie" )
            , ( "trip (galley)", "tao lin" )
            , ( "god box", "mallory whitten" )
            , ( "milk and henny", "peter bd" )
            , ( "the wapshot chronicle", "john cheever" )
            , ( "todd", "andrew james weatherhead" )
            , ( "thin kimono", "michael earl craig" )
            , ( "talkativeness", "michael earl craig" )
            , ( "the girls", "emma cline" )
            , ( "i would do anything for love", "al bedell" )
            , ( "true hallucinations", "terence mckenna" )
            ]
          )
        , ( 2017
          , [ ( "the invisible landscape (didn't finish)", "terence mckenna" )
            , ( "the old man and the sea", "ernest hemingway" )
            , ( "northern california haiku", "mallory whitten" )
            , ( "the psychedelic explorer's guide", "james fadiman" )
            , ( "play it as it lays", "joan didion" )
            , ( "a sleep and a forgetting", "william dean howell" )
            , ( "falling in place", "ann beattie" )
            , ( "do androids dream of electric sheep", "philip k dick" )
            , ( "taipei  (re-read)", "tao lin" )
            , ( "junky", "william burroughs" )
            , ( "eileen", "otessa moshfegh" )
            , ( "thanks", "zachary german" )
            , ( "you got to burn to shine", "john giorno" )
            , ( "new yorker stories (didnt finish)", "ann beattie" )
            , ( "honored guest (didnt finish)", "joy williams" )
            , ( "jesus' son (didnt finish)", "denis johnson" )
            , ( "the contemporary short story packet (didnt finish)", "ed. tao lin" )
            , ( "homesick for another planet", "otessa moshfegh" )
            , ( "elbowing the seducer", "t. gertler" )
            , ( "literally show me a healthy person", "darcie wilder" )
            , ( "falconer", "john cheever" )
            , ( "ajebota", "precious okoyomon" )
            , ( "a little life (didnt finish)", "hanya yanagihara" )
            , ( "[assorted zines]", "rebecca warlick" )
            , ( "junky II", "peter bd" )
            , ( "the story of the lost child", "elena ferrante" )
            , ( "those who leave and those who stay", "elena ferrante" )
            , ( "cool girls hate their bodies", "david fishkind" )
            , ( "the story of a new name", "elena ferrante" )
            , ( "o.k. (didnt finish)", "kool a.d." )
            , ( "memory foam", "adam soldofsky" )
            , ( "loving the ocean wont keep it from killing you", "rachel bell" )
            , ( "my brilliant friend", "elena ferrante" )
            , ( "the big u", "neal stephenson" )
            ]
          )
        ]


poetry : List ( String, String )
poetry =
    [ ( "http://muumuuhouse.com/wp.07jun2021.html", "Three Poems From L-Theanine (muumuu house)")
    , ( "http://thenervousbreakdown.com/willisplummer/2020/10/three-poems-from-mons-pubis/", "Three Poems From MONS PUBIS (The Nervous Breakdown)" )
    , ( "http://quick-books.biz/", "The Book of Judith (quickbooks, pamphlet, ltd run of 100)" )
    , ( "https://ghostcitypress.com/2017-summer-microchap-series/wild-horse-rappers", "wild horse rappers (with precious okoyomon)" )
    , ( "http://muumuuhouse.com/wp.22may2017.html", "10,000 year clock (muumuu house)" )
    , ( "http://www.bodegamag.com/articles/172-bros", "bros (bodega mag)" )
    , ( "http://darkfuckingwizard.com/three-poems/", "3 poems (dark fucking wizard)" )
    , ( "http://muumuuhouse.com/wp.13nov2014.html", "14 haiku (muumuu house)" )
    , ( "https://preludemag.com/contributors/willis-plummer/", "3 poems (prelude magazine)" )
    , ( "https://genius.com/Willis-plummer-good-and-beautiful-annotated", "good and beautiful (2014 judith lobel arkin prize honorable mention)" )
    , ( "http://www.hobartpulp.com/web_features/5-poems--8", "5 poems (hobartpulp)" )
    ]


prose : List ( String, String )
prose =
    [ ( "https://thecreativeindependent.com/people/visual-artists-andrew-zebulon-and-kristen-wintercheck-on-letting-your-materials-guide-you/", "kristen wintercheck and andrew zebulon on letting your materials guide you" )
    , ( "https://thecreativeindependent.com/people/poet-matthew-rohrer-on-challenging-your-own-process/", "matthew rohrer on challenging your own process" )
    , ( "http://thenervousbreakdown.com/willisplummer/2018/11/two-stories/", "two stories (the nervous breakdown)" )
    , ( "https://thecreativeindependent.com/people/writer-megan-boyle-on-documenting-your-entire-life-in-your-creative-work/", "megan boyle on documenting your entire life in your creative work" )
    , ( "https://thecreativeindependent.com/people/poet-andrew-weatherhead-on-hijacking-language/", "andrew weatherhead on hijacking language" )
    , ( "https://thecreativeindependent.com/people/tao-lin-on-why-he-writes/", "tao lin on why he writes" )
    , ( "https://thecreativeindependent.com/people/precious-okoyomon-on-finding-poetry-in-everything/", "precious okoyomon on finding poetry in everything" )
    , ( "https://medium.com/kickstarter/total-party-kill-3898fb82b5fb#.31wxy6hzl", "total party kill: the architects of dungeons and dragons" )
    , ( "http://thoughtcatalog.com/2013/not-even-doom-music-an-interview-with-mat-riviere/", "not even doom music: an interview with mat riviere" )
    , ( "http://thoughtcatalog.com/2013/an-interview-with-nytyrant-in-four-parts/", "an interview with ny tyrant in four parts" )
    ]


projects : List Project
projects =
    [ {
       title = "Tetris on Metal"
    , description = """
        My latest gamedev project has been implementing Tetris in my Swift-Metal 'framework'.
        So far, I'm around 80% fidelity. It's been a lot of fun learning how Tetris really works.
        Did you know that on initial release, every country's version had slightly different rules
        and functionality?
    """
     , links = [("https://github.com/willisplummer/metal-tetris", "github")] } 
      , {
        title = "Two Implementations of Snake"
      , description = """
                        In an effort to learn video game development I reimplemented Snake
                        in Godot. Then I wrote it again in Swift using Metal to interface
                        directly with the GPU.
                      """ 
      , links = [( "https://github.com/willisplummer/godot-snake", "godot implementation"), ( "https://github.com/willisplummer/metal-snake", "swift + metal")]
      }
      ,{
        title = "Public Texting"
      , description = """
                       A small nodejs application to enable public interviews performed via SMS.
                       Participants generate a proxy number via Twilio and then send message there.
                       The messages are forwarded back and forth like a normal text conversation and appear on the site as well.
                        """
      , links = [( "https://github.com/willisplummer/public-texting", "github")]
      }
     ,{ title = "Tic Tac Toe AI" 
      , description = """
                        A Tic Tac Toe API that recurses through every possible move and chooses the option with the most winning outcomes.
                        Written as an opportunity to experiment with ReasonML.
                      """
      , links = [ ("https://github.com/willisplummer/reason-react-tictac", "github")]
      }
      ,{ title = "A Colorful Landing Page"
      , description = """
                        A lightweight landing page for any type of project.
                        Mouseover the squares to change their color and shape.
                        I used RXJS for handling navigation and cursor events.
                        """
      , links = [ ( "https://willisplummer.github.io/demo-squares/", "site" ), ( "https://github.com/willisplummer/demo-squares", "github" ) ]
      }
    , { title = "Kickstarter Experts"
      , description = """
                        A standalone page for Kickstarter's Experts program.
                        Implemented in React with atomic classes generated via SCSS.
                        The list of Experts is sourced from a Rails controller.
                      """
      , links = [ ( "https://www.kickstarter.com/experts", "site" ) ]
      }
    , { title = "This Portfolio Site"
      , description = """
                        This single-page portfolio site was built using Elm.
                        It implements the Navigation and URLparser packages to handle routing.
                        """
      , links = [ ( "https://github.com/willisplummer/elm-personal-website", "github" ) ]
      }
    , { title = "MTA Bus Times App for Amazon Echo"
      , description = """
                        This ruby app runs on Sinatra and enables the Amazon Echo to
                        let you know when the next bus will arrive via the MTA's Bus Time API.
                        """
      , links = [ ( "https://github.com/willisplummer/mta_alexa_app", "github" ) ]
      }
    , { title = "Western Beefs of North America"
      , description = """
                        This is a poetry and prose website that I edited in 2014 and 2015.
                        I built a Rails CMS to simplify the process of adding new content.
                        """
      , links = [ ( "http://westernbeefs.com/", "site" ), ( "https://github.com/willisplummer/westernbeefs", "github" ) ]
      }
    ] 
