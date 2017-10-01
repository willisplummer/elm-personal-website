module MainSpec exposing (..)

import ModelSpec
import Test exposing (..)
import UpdateSpec


suite : Test
suite =
    describe "my website"
        [ ModelSpec.spec
        , UpdateSpec.spec
        ]
