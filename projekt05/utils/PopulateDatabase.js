import { DatabaseSync } from "node:sqlite"

const lorem_ipsum=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur nulla lacus, quis imperdiet nisl maximus sit amet. Vivamus luctus malesuada leo. Integer blandit finibus magna, in consectetur turpis dapibus sit amet. Vivamus congue dictum sapien ut placerat. Aenean aliquam neque tincidunt eros hendrerit pharetra. Phasellus lacinia mollis vestibulum. Mauris egestas lectus ac augue porttitor egestas. Mauris sodales diam at lorem viverra gravida. Maecenas dictum, orci vitae porttitor convallis, odio sapien volutpat dui, sed dictum justo metus et felis. Nullam pellentesque dolor in mi hendrerit, nec sollicitudin nibh varius. Morbi posuere enim at risus consectetur viverra. Sed in metus congue, elementum purus non, bibendum mauris.

Praesent fringilla vestibulum lorem, hendrerit eleifend ante dapibus sit amet. Nulla euismod pretium pellentesque. Nullam aliquam dui non ante porttitor luctus. Curabitur auctor ante nibh, ac egestas arcu hendrerit id. Aliquam ac vulputate dui. Duis lorem purus, blandit non scelerisque in, placerat ut eros. Suspendisse potenti.

Aliquam pellentesque, libero sit amet aliquam cursus, mauris purus facilisis ligula, et dapibus sem tellus a neque. Aliquam erat volutpat. Duis sit amet est placerat, auctor nibh et, porttitor dolor. Aenean nisi nisl, dictum nec lectus eget, lobortis tempus sapien. Proin ut ultricies metus. Proin pharetra eu tortor quis consequat. Phasellus neque leo, laoreet et sollicitudin sed, malesuada a urna. Nam eleifend vestibulum convallis. Morbi ut ullamcorper turpis. Etiam sagittis, libero et condimentum ornare, dolor urna fermentum quam, ac interdum dolor leo viverra erat.

Nulla vel lacinia lorem. Pellentesque ac est vel ligula gravida maximus. Aenean tellus nisl, volutpat nec congue id, congue ac lectus. Etiam non purus malesuada, porttitor velit ut, efficitur nulla. Aenean faucibus vehicula neque. Ut est risus, tempor efficitur efficitur ac, suscipit vitae mi. Vestibulum vulputate odio sit amet mauris dictum efficitur. Proin sem purus, interdum et lacinia et, pellentesque in est. Pellentesque porta sollicitudin velit mollis iaculis. Mauris hendrerit enim mauris, eget scelerisque quam convallis vitae. Praesent elementum ex est, eget ornare urna rutrum eu. Nunc ante tortor, porttitor eu posuere vitae, sollicitudin eu arcu. Sed accumsan enim elit. Quisque id augue dui. Quisque porta porta velit in aliquet. Vivamus posuere luctus sem et condimentum.

Cras lobortis sit amet nunc ut ullamcorper. Maecenas a ligula varius, congue nisi eget, posuere odio. Morbi ultrices leo nec augue dapibus facilisis. Sed at tincidunt est, quis finibus lacus. Nam volutpat massa lorem, eu ultrices elit ornare et. Sed facilisis augue velit, sed interdum turpis tristique et. Curabitur dapibus dui odio, et mattis ligula interdum vel. In leo erat, cursus eu malesuada vel, laoreet ac eros. Aliquam feugiat faucibus tristique. Aliquam placerat diam massa, quis finibus sapien molestie id. Phasellus tincidunt lacus vel orci mattis, quis convallis leo varius. In dignissim mi mauris, non commodo ante volutpat nec. Suspendisse sem sapien, tincidunt et auctor sed, ultrices sit amet risus. Quisque viverra felis ut sollicitudin ullamcorper.

Phasellus a nulla ac risus aliquet iaculis. Mauris tincidunt dui arcu, et tempor sapien pharetra a. Nulla facilisi. Curabitur ultricies, arcu eget pellentesque molestie, purus felis sodales tortor, non porta odio erat sit amet quam. Morbi non magna malesuada urna ultrices dignissim. Vivamus vulputate efficitur magna vitae scelerisque. Praesent sed massa gravida, rhoncus lorem eget, ultrices metus. Proin a ex neque. Vestibulum convallis suscipit interdum. Phasellus sit amet nulla sed tellus placerat convallis id vitae justo. Integer odio est, laoreet scelerisque odio ac, ullamcorper euismod nisl. Morbi eu diam lacus.

Donec convallis sem ut tincidunt ultrices. Mauris sagittis semper risus, vel gravida lorem porttitor vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc tempus placerat dolor, quis posuere orci facilisis ac. Cras mattis accumsan justo eget hendrerit. Integer mattis, felis a sagittis gravida, orci sapien suscipit turpis, vel venenatis mauris lectus eu nunc. Vestibulum eu tristique augue. Morbi in interdum orci, vel pellentesque enim. Nullam aliquam lacinia elit, et placerat lorem fringilla quis. Etiam eu arcu porta, finibus orci a, interdum sem.

Etiam vitae mattis ante. Mauris lectus tortor, finibus id interdum at, hendrerit sed lorem. Vivamus id odio imperdiet, egestas urna id, volutpat ante. Mauris gravida rutrum odio tincidunt tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt eros lacus, quis posuere quam iaculis at. Fusce sollicitudin ornare felis, non laoreet eros vulputate id. Vivamus quis tristique sem.

In vitae lorem malesuada ipsum fringilla dapibus. Duis et nisi eros. Nam viverra velit non consequat dictum. Morbi accumsan mattis lacus. Phasellus a leo et nunc mattis accumsan a sit amet neque. Suspendisse elementum cursus lectus, sed porta neque mollis a. Duis et facilisis nisi. Quisque vitae eros ligula. Proin rhoncus neque lacus, sit amet fringilla elit condimentum sed.

Duis ornare arcu ut orci fermentum rhoncus. In hac habitasse platea dictumst. Cras rutrum dapibus nulla sed ultrices. Nulla eros nunc, egestas non mollis eget, fringilla vitae nisi. Aenean sed cursus massa. Sed lectus ipsum, hendrerit a cursus vitae, finibus sed nibh. Phasellus vestibulum nibh velit, nec efficitur est euismod non. Nulla lacinia nibh massa, non congue neque iaculis sed. Pellentesque iaculis nunc a nulla facilisis consequat. Sed a feugiat enim. In hac habitasse platea dictumst. `

const db_path="./db.sqlite"
const database= new DatabaseSync(db_path)

database.exec(
    `CREATE TABLE IF NOT EXISTS "entries" 
     (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL ,
        body TEXT NOT NULL ,
        author_id INTEGER
     );`)

database.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id         INTEGER PRIMARY KEY,
    username        TEXT UNIQUE,
    passhash        TEXT,
    created_at      INTEGER
    ) STRICT;
  `);
database.exec(`
  CREATE TABLE IF NOT EXISTS sesje (
    id              INTEGER PRIMARY KEY,
    user_id         INTEGER,
    created_at      INTEGER
  ) STRICT;
  `);


database.exec(
   `INSERT INTO entries(title,body) VALUES ('NIKON D500','${lorem_ipsum}'),('Canon EOS r50','${lorem_ipsum}'),('NIKON Z50 II','${lorem_ipsum}') `
)


database.close()