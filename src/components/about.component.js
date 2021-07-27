// this is just a readonly component and text is copied/generated from https://loremipsum.io/
function About() {
    return (
        <>
            <header className="bg-dark py-5" style={{ background: 'url(' + process.env.PUBLIC_URL + '/slider1.jpg)', backgroundSize: 'auto' }}>
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">About us</h1>
                        {/* <p className="lead fw-normal text-white mb-0">Refresh your mind with books</p> */}
                    </div>
                </div>
            </header>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>
                    <div>
                        <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut porttitor leo a diam sollicitudin tempor id eu. Sociis natoque penatibus et magnis. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Sed ullamcorper morbi tincidunt ornare. Sed libero enim sed faucibus turpis in. Rhoncus dolor purus non enim praesent elementum facilisis leo. Et sollicitudin ac orci phasellus egestas tellus rutrum. Mauris augue neque gravida in fermentum et. Varius duis at consectetur lorem donec massa sapien faucibus.</p>

                        <p className="text-justify">Quam viverra orci sagittis eu volutpat odio facilisis mauris sit. In arcu cursus euismod quis viverra nibh. Non sodales neque sodales ut. Porttitor eget dolor morbi non. Sed augue lacus viverra vitae congue eu. Nisi est sit amet facilisis magna. Lacinia at quis risus sed vulputate odio ut enim. Cursus in hac habitasse platea dictumst. Neque convallis a cras semper auctor. Id velit ut tortor pretium viverra suspendisse. Morbi non arcu risus quis varius quam. Pellentesque nec nam aliquam sem et tortor consequat id porta. Laoreet sit amet cursus sit amet dictum sit amet justo. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat. Habitant morbi tristique senectus et. Tellus id interdum velit laoreet id donec ultrices tincidunt arcu. Sit amet est placerat in egestas erat. Cras pulvinar mattis nunc sed blandit libero volutpat. Vel pharetra vel turpis nunc eget lorem dolor sed. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed.</p>

                        <p className="text-justify">Adipiscing vitae proin sagittis nisl. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Lacinia at quis risus sed. Imperdiet massa tincidunt nunc pulvinar. Mauris augue neque gravida in fermentum et sollicitudin. Iaculis urna id volutpat lacus. Eget mi proin sed libero enim. Et molestie ac feugiat sed lectus vestibulum mattis. Nascetur ridiculus mus mauris vitae ultricies leo integer. Quam quisque id diam vel quam elementum pulvinar etiam.</p>

                        <p className="text-justify">Magna ac placerat vestibulum lectus. Tellus id interdum velit laoreet id. Ac tortor dignissim convallis aenean et tortor at. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Mollis nunc sed id semper. Pretium aenean pharetra magna ac placerat vestibulum. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Amet luctus venenatis lectus magna fringilla. Pretium fusce id velit ut tortor pretium viverra. Vulputate eu scelerisque felis imperdiet. Urna id volutpat lacus laoreet non curabitur. Et molestie ac feugiat sed lectus. Dictum sit amet justo donec enim diam vulputate ut pharetra. Fermentum iaculis eu non diam. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Congue quisque egestas diam in.</p>

                        <p className="text-justify">Fringilla urna porttitor rhoncus dolor. Tempus iaculis urna id volutpat lacus. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Et odio pellentesque diam volutpat commodo. Viverra justo nec ultrices dui sapien eget mi proin sed. Eget velit aliquet sagittis id. Dis parturient montes nascetur ridiculus mus mauris vitae. In nisl nisi scelerisque eu. Pulvinar pellentesque habitant morbi tristique senectus. Pharetra sit amet aliquam id. Condimentum mattis pellentesque id nibh tortor id. Pretium fusce id velit ut. Est placerat in egestas erat. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Odio ut sem nulla pharetra diam sit amet nisl. Nec ullamcorper sit amet risus nullam eget felis eget. Faucibus ornare suspendisse sed nisi lacus sed viverra. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About