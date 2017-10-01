module Main exposing (..)

import List exposing (..)
import Model exposing (init)
import Navigation exposing (program)
import Types exposing (..)
import Update exposing (update)
import View exposing (view)


main : Program Never Model Msg
main =
    program UrlChange
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
