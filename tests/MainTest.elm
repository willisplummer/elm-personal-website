module MainTest exposing (..)

import ModelTest exposing (modelSuite)
import Test exposing (..)
import UpdateTest exposing (updateSuite)


suite : Test
suite =
    describe "my website"
        [ modelSuite
        , updateSuite
        ]
