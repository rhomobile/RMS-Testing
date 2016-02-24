*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/DatabaseTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Database VT287-1 -To Open a DatabaseEB.Database-
    [Documentation]
    [Tags]    Android
    readResult    VT287-1 -To Open a DatabaseEB.Database-

STTL-116702 Database VT287-02 - ExecuteSql without passing Args -
    [Documentation]
    [Tags]    Android
    readResult    VT287-02 - ExecuteSql without passing Args -

STTL-116703 Database VT287-003 -executeBatchSql without passing any Args-
    [Documentation]
    [Tags]    Android
    readResult    VT287-003 -executeBatchSql without passing any Args-

STTL-116704 Database VT287-4 - Destroy all the tables -
    [Documentation]
    [Tags]    Android
    readResult    VT287-4 - Destroy all the tables -

STTL-116705 Database VT287-05 - Destroy all the tables except few -'true'
    [Documentation]
    [Tags]    Android
    readResult    VT287-05 - Destroy all the tables except few -'true'

STTL-116706 Database VT287-06 - Include and Exclude with Values -'true'
    [Documentation]
    [Tags]    Android
    readResult    VT287-06 - Include and Exclude with Values -'true'

STTL-116707 Database VT287-007-Destroy single table-
    [Documentation]
    [Tags]    Android
    readResult    VT287-007-Destroy single table-

STTL-116708 Database VT287-10-Close the Database and Open it -
    [Documentation]
    [Tags]    Android
    readResult    VT287-10-Close the Database and Open it -

STTL-116709 Database VT287-11 - To do a database transaction -
    [Documentation]
    [Tags]    Android
    readResult    VT287-11 - To do a database transaction -

STTL-116710 Database VT287-12 - To demonstrate rollbacktranscation () -
    [Documentation]
    [Tags]    Android
    readResult    VT287-12 - To demonstrate rollbacktranscation () -

STTL-116711 Database VT287-13 - To demonstrate rollbacktranscation after commitTransaction() -
    [Documentation]
    [Tags]    Android
    readResult    VT287-13 - To demonstrate rollbacktranscation after commitTransaction() -

STTL-116712 Database VT287-16 - To demonstrate executeBatchSql by passing null value -
    [Documentation]
    [Tags]    Android
    readResult    VT287-16 - To demonstrate executeBatchSql by passing null value -

STTL-116713 Database VT287-21 -Opening Database at predefined partition app-
    [Documentation]
    [Tags]    Android
    readResult    VT287-21 -Opening Database at predefined partition app-

STTL-116714 Database VT287-22 -Opening Database at predefined partition user-
    [Documentation]
    [Tags]    Android
    readResult    VT287-22 -Opening Database at predefined partition user-

STTL-116715 Database VT287-24 - rollback called after drop table -
    [Documentation]
    [Tags]    Android
    readResult    VT287-24 - rollback called after drop table -

STTL-116716 Database VT287-28 - rollback called after drop table -'true'
    [Documentation]
    [Tags]    Android
    readResult    VT287-28 - rollback called after drop table -'true'

STTL-116717 Database VT287-29 -Add a new Column using Execute SQL-
    [Documentation]
    [Tags]    Android
    readResult    VT287-29 -Add a new Column using Execute SQL-

STTL-116718 Database VT287-30-Destroy same table Twice -
    [Documentation]
    [Tags]    Android
    readResult    VT287-30-Destroy same table Twice -

STTL-116719 Database VT287-31-Operating two db objects with diff path and diff Partition -
    [Documentation]
    [Tags]    Android
    readResult    VT287-31-Operating two db objects with diff path and diff Partition -

STTL-116720 Database VT287-33-Operating two db objects with diff path and diff Partition and closing one db object -
    [Documentation]
    [Tags]    Android
    readResult    VT287-33-Operating two db objects with diff path and diff Partition and closing one db object -

STTL-116721 Database VT287-34 - Destroy all the tables without giveing any value -'true'
    [Documentation]
    [Tags]    Android
    readResult    VT287-34 - Destroy all the tables without giveing any value -'true'

STTL-116722 Database VT287-35 -destroy tables by passing invalid array parameters -'true'
    [Documentation]
    [Tags]    Android
    readResult    VT287-35 -destroy tables by passing invalid array parameters -'true'

STTL-116723 Database VT287-36 - DestroyTables with combination of valid and invalid table names -
    [Documentation]
    [Tags]    Android
    readResult    VT287-36 - DestroyTables with combination of valid and invalid table names -

STTL-116724 Database VT287-37 - Destroy all the tables without giveing any value -'true'
    [Documentation]
    [Tags]    Android
    readResult    VT287-37 - Destroy all the tables without giveing any value -'true'

STTL-116725 Database VT287-38 - CAll rollback Transaction without start Transaction -'true'
    [Documentation]
    [Tags]    Android
    readResult    VT287-38 - CAll rollback Transaction without start Transaction -'true'

STTL-116726 Database VT287-38 - Call rollback Transaction without start Transaction -'true'
    [Documentation]
    [Tags]    Android
    readResult    VT287-38 - Call rollback Transaction without start Transaction -'true'

STTL-116727 Database starts and commits transaction
    [Documentation]
    [Tags]    Android
    readResult    starts and commits transaction

STTL-116728 Database starts and rollbacks transaction
    [Documentation]
    [Tags]    Android
    readResult    starts and rollbacks transaction

STTL-116729 Database locks and unlocks database
    [Documentation]
    [Tags]    Android
    readResult    locks and unlocks database

STTL-116730 Database calls isUiWaitForDb
    [Documentation]
    [Tags]    Android
    readResult    calls isUiWaitForDb

STTL-116731 Database executes SQL statements
    [Documentation]
    [Tags]    Android
    readResult    executes SQL statements

STTL-116732 Database executes SQL statements as batch
    [Documentation]
    [Tags]    Android
    readResult    executes SQL statements as batch

STTL-116733 Database destroys table
    [Documentation]
    [Tags]    Android
    readResult    destroys table

STTL-116734 Database all
    [Documentation]
    [Tags]    Android
    readResult    all

STTL-116735 Database all but excluded
    [Documentation]
    [Tags]    Android
    readResult    all but excluded

STTL-116736 Database included only
    [Documentation]
    [Tags]    Android
    readResult    included only

STTL-116737 Database included only but excluded
    [Documentation]
    [Tags]    Android
    readResult    included only but excluded

STTL-116738 Database checks for table existence
    [Documentation]
    [Tags]    Android
    readResult    checks for table existence

STTL-116739 Database sets "don\'t backup attribute"
    [Documentation]
    [Tags]    Android
    readResult    sets "don\'t backup attribute"

STTL-116740 Database creates SQLite3 object and closes it
    [Documentation]
    [Tags]    Android
    readResult    creates SQLite3 object and closes it

STTL-116741 Database starts and commits transaction
    [Documentation]
    [Tags]    Android
    readResult    starts and commits transaction

STTL-116742 Database starts and rollbacks transaction
    [Documentation]
    [Tags]    Android
    readResult    starts and rollbacks transaction

STTL-116743 Database locks and unlocks database
    [Documentation]
    [Tags]    Android
    readResult    locks and unlocks database

STTL-116744 Database all
    [Documentation]
    [Tags]    Android
    readResult    all

STTL-116745 Database all but excluded
    [Documentation]
    [Tags]    Android
    readResult    all but excluded

STTL-116746 Database included only
    [Documentation]
    [Tags]    Android
    readResult    included only

STTL-116747 Database included only but excluded
    [Documentation]
    [Tags]    Android
    readResult    included only but excluded

STTL-116748 Database checks for table existence
    [Documentation]
    [Tags]    Android
    readResult    checks for table existence

STTL-116749 Database checks something strange
    [Documentation]
    [Tags]    Android
    readResult    checks something strange

STTL-116750 Database executes SQL statements
    [Documentation]
    [Tags]    Android
    readResult    executes SQL statements

STTL-116751 Database restores dropped table on rollback and drops it on commit
    [Documentation]
    [Tags]    Android
    readResult    restores dropped table on rollback and drops it on commit

