-All basic variables that use more than in one place should be placed in /src/less/common/variables.less
-All common CSS selectors that used more than in one place should be placed in /src/less/common/common.less
-LESS structure is BEM: (B)lock-(E)lement-(M)odifier.
-Naming standart:
.b-[block-name] {
    &__[element-1-name] {  }
    &__[element-2-name] {
        &.m-[modifier-1-name] {  }
        &.m-[modifier-2-name] {  }
    }
}
Files should be named by block name and placed in /src/less/pages/[page_name]/b-[block-name].less

For example, see on /src/less/pages/home/b-contacts.less:

.b-contacts - is a (B)lock
.b-contacts__schedule - is an (E)lement
.b-contacts.m-wide - is a (M)odifier for Block

-Also in common.less there are some common classes , such as .container, .site-wrapper, .site-container
-Also in common.less there are .container, .row, .col-xs-(N) - Bootstrap Grid without responsiveness to make it custom for our needs.
All common responsiveness rules should be placed in the same place.

