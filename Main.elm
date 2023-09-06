module Main exposing (..)

import List exposing (..)
import Model exposing (init)
import Browser exposing (application)
import Types exposing (..)
import Update exposing (update)
import View exposing (view)

 
main : Program () Model Msg
main =
    application
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        , onUrlRequest = \_ -> Noop
        , onUrlChange = UrlChange
        }

