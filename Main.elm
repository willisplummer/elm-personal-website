module Main exposing (..)

import Browser exposing (application)
import List exposing (..)
import Model exposing (init)
import Types exposing (..)
import Update exposing (update)
import View exposing (view)


main : Program String Model Msg
main =
    application
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        , onUrlChange = UrlChange
        , onUrlRequest = LinkClicked
        }
